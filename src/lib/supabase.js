import { createClient } from '@supabase/supabase-js';

// Get config from localStorage or Vite environment variables
export const getSupabaseConfig = () => {
  const localUrl = typeof window !== 'undefined' ? localStorage.getItem('roblox_supabase_url') : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('roblox_supabase_key') : null;

  const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
  const url = localUrl || env.VITE_SUPABASE_URL || '';
  const anonKey = localKey || env.VITE_SUPABASE_ANON_KEY || '';

  return { url, anonKey, isConfigured: Boolean(url && anonKey) };
};

// Create a Supabase client instance dynamically
export const getSupabaseClient = () => {
  const { url, anonKey } = getSupabaseConfig();
  if (url && anonKey) {
    try {
      return createClient(url, anonKey);
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
};

export const saveSupabaseConfig = (url, anonKey) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('roblox_supabase_url', url.trim());
    localStorage.setItem('roblox_supabase_key', anonKey.trim());
  }
};

export const clearSupabaseConfig = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('roblox_supabase_url');
    localStorage.removeItem('roblox_supabase_key');
  }
};

/**
 * Handle user registration:
 * 1. If Supabase is connected, inserts into 'roblox_users' table.
 * 2. Saves to localStorage 'roblox_registered_users' as backup/cache.
 */
export const registerUser = async (userData) => {
  const client = getSupabaseClient();
  const timestamp = new Date().toISOString();
  const userRecord = {
    username: userData.username,
    birthday: `${userData.year}-${String(userData.month).padStart(2, '0')}-${String(userData.day).padStart(2, '0')}`,
    gender: userData.gender || 'unspecified',
    created_at: timestamp,
    // Store password as requested for the custom database
    password: userData.password,
  };

  let supabaseResult = null;
  let supabaseError = null;

  if (client) {
    try {
      const { data, error } = await client
        .from('roblox_users')
        .insert([userRecord])
        .select();

      if (error) {
        supabaseError = error.message;
        console.warn('Supabase insert warning:', error);
      } else {
        supabaseResult = data;
      }
    } catch (err) {
      supabaseError = err.message;
      console.error('Supabase error:', err);
    }
  }

  // Also store locally for instant preview / offline capability
  try {
    const existing = JSON.parse(localStorage.getItem('roblox_registered_users') || '[]');
    existing.unshift({ ...userRecord, id: 'user_' + Date.now(), syncedToSupabase: !!supabaseResult });
    localStorage.setItem('roblox_registered_users', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.error('Failed to cache locally:', e);
  }

  return {
    success: true,
    supabaseSynced: !!supabaseResult,
    supabaseError,
    data: userRecord,
  };
};

export const fetchRegisteredUsers = async () => {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('roblox_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { data, source: 'supabase' };
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
    }
  }

  const local = JSON.parse(localStorage.getItem('roblox_registered_users') || '[]');
  return { data: local, source: 'local' };
};

export const loginUser = async (identifier, password) => {
  const client = getSupabaseClient();
  const trimmed = identifier.trim();

  // 1. Try Supabase if configured
  if (client) {
    try {
      const { data, error } = await client
        .from('roblox_users')
        .select('*')
        .eq('username', trimmed)
        .limit(1);

      if (!error && data && data.length > 0) {
        const user = data[0];
        if (user.password === password) {
          return { success: true, user, source: 'supabase' };
        } else {
          return { success: false, error: 'Incorrect username or password. Please try again.' };
        }
      }
    } catch (err) {
      console.warn('Supabase login query error:', err);
    }
  }

  // 2. Check local database cache
  try {
    const local = JSON.parse(localStorage.getItem('roblox_registered_users') || '[]');
    const match = local.find(
      (u) => u.username?.toLowerCase() === trimmed.toLowerCase()
    );

    if (match) {
      if (match.password === password) {
        return { success: true, user: match, source: 'local' };
      } else {
        return { success: false, error: 'Incorrect username or password. Please try again.' };
      }
    }
  } catch (e) {
    console.error('Error checking local users:', e);
  }

  // 3. Fallback: If no user found and Supabase is not connected, allow demo login or show error
  return {
    success: false,
    error: 'Incorrect username or password. Please try again or create an account.',
  };
};

/**
 * Dynamic Account Recovery: Find account in Supabase or local DB
 */
export const findUserForRecovery = async (identifier) => {
  const client = getSupabaseClient();
  const trimmed = identifier.trim();

  if (client) {
    try {
      const { data, error } = await client
        .from('roblox_users')
        .select('id, username, birthday, gender, created_at')
        .ilike('username', trimmed)
        .limit(1);

      if (!error && data && data.length > 0) {
        return { success: true, user: data[0], source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase query error:', err);
    }
  }

  // Check local cache
  try {
    const local = JSON.parse(localStorage.getItem('roblox_registered_users') || '[]');
    const match = local.find(
      (u) => u.username?.toLowerCase() === trimmed.toLowerCase()
    );
    if (match) {
      return { success: true, user: match, source: 'local' };
    }
  } catch (e) {
    console.error(e);
  }

  return {
    success: false,
    error: 'We couldn’t find an account matching that username, email, or phone number.',
  };
};

/**
 * Dynamic Password Reset: Update password in Supabase and local DB
 */
export const updateUserPassword = async (username, newPassword) => {
  const client = getSupabaseClient();
  const trimmed = username.trim();
  let supabaseUpdated = false;

  if (client) {
    try {
      const { error } = await client
        .from('roblox_users')
        .update({ password: newPassword })
        .ilike('username', trimmed);

      if (!error) {
        supabaseUpdated = true;
      }
    } catch (err) {
      console.error('Supabase password update error:', err);
    }
  }

  // Also update local cache
  try {
    const local = JSON.parse(localStorage.getItem('roblox_registered_users') || '[]');
    const updated = local.map((u) => {
      if (u.username?.toLowerCase() === trimmed.toLowerCase()) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    localStorage.setItem('roblox_registered_users', JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return { success: true, supabaseUpdated };
};


