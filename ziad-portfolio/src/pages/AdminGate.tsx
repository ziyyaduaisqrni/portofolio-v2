import { FormEvent, useEffect, useState } from 'react';
import AdminPage from './AdminPage';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

export default function AdminGate() {
  const [sessionReady, setSessionReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSessionReady(true);
      return;
    }

    const supabase = getSupabaseClient();
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
      setSessionReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSignedIn(Boolean(nextSession));
      setSessionReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { error: authError } = await getSupabaseClient().auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!sessionReady) {
    return <div className="min-h-screen bg-obsidian grid place-items-center text-slate-300">Checking admin session…</div>;
  }

  if (!isSupabaseConfigured) {
    return <div className="min-h-screen bg-obsidian grid place-items-center p-6 text-center text-red-200">Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.</div>;
  }

  if (signedIn) return <AdminPage />;

  return (
    <main className="min-h-screen bg-obsidian px-6 py-16 text-slate-100 grid place-items-center">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Private area</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Portfolio Admin</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Sign in with your Supabase Auth account to manage projects and certificates.</p>
        <div className="mt-7 space-y-4">
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400/50" />
          <input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-cyan-400/50" />
        </div>
        {error ? <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}
        <button disabled={submitting} className="mt-6 w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
