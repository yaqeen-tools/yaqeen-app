'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldMark, Wordmark } from '../../components/Logo';

const FUNCTIONS_URL = 'https://qtixhhztkuyqgsflhmkt.supabase.co/functions/v1';

const copy = {
  ar: {
    dir: 'rtl',
    toggle: 'English',
    tabLogin: 'تسجيل الدخول',
    tabSignup: 'حساب جديد',
    emailPlaceholder: 'you@company.com',
    passwordPlaceholder: 'كلمة المرور',
    loginBtn: 'دخول',
    signupBtn: 'إنشاء الحساب',
    loading: 'جاري المعالجة...',
    passwordHint: '8 أحرف على الأقل',
    signupSuccess: 'تم إنشاء حسابك! جرّب تسجيل الدخول الآن.',
  },
  en: {
    dir: 'ltr',
    toggle: 'العربية',
    tabLogin: 'Sign in',
    tabSignup: 'Create account',
    emailPlaceholder: 'you@company.com',
    passwordPlaceholder: 'Password',
    loginBtn: 'Sign in',
    signupBtn: 'Create account',
    loading: 'Processing...',
    passwordHint: 'At least 8 characters',
    signupSuccess: 'Account created! Try signing in now.',
  },
} as const;

export default function LoginPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = copy[lang];
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'busy' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('busy');
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus('error');
      setErrorMsg(lang === 'ar' ? 'إيميل أو كلمة مرور غير صحيحة' : 'Invalid email or password');
      return;
    }
    window.location.href = '/dashboard';
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus('busy');
    setErrorMsg('');
    try {
      const res = await fetch(`${FUNCTIONS_URL}/signup-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(result.error || 'صار خطأ، حاول مرة ثانية');
        return;
      }
      setStatus('success');
      setMode('login');
    } catch {
      setStatus('error');
      setErrorMsg('تعذر الاتصال بالخادم');
    }
  }

  return (
    <main dir={t.dir} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%', margin: 20, borderTop: '3px solid var(--navy)' }}>
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ShieldMark size={56} />
            <Wordmark />
          </div>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 4, padding: '5px 10px', fontSize: 12.5, color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {t.toggle}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#f1ebda', borderRadius: 6, padding: 4 }}>
          <button
            onClick={() => { setMode('login'); setStatus('idle'); setErrorMsg(''); }}
            style={{
              flex: 1, padding: '9px 0', fontSize: 14, fontWeight: 600, borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: mode === 'login' ? 'var(--navy)' : 'transparent',
              color: mode === 'login' ? '#fbf7ee' : 'var(--muted)',
            }}
          >
            {t.tabLogin}
          </button>
          <button
            onClick={() => { setMode('signup'); setStatus('idle'); setErrorMsg(''); }}
            style={{
              flex: 1, padding: '9px 0', fontSize: 14, fontWeight: 600, borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: mode === 'signup' ? 'var(--navy)' : 'transparent',
              color: mode === 'signup' ? '#fbf7ee' : 'var(--muted)',
            }}
          >
            {t.tabSignup}
          </button>
        </div>

        {status === 'success' && (
          <div style={{ fontSize: 13.5, color: 'var(--navy)', background: '#e7f0ea', padding: 12, borderRadius: 4, marginBottom: 16 }}>
            {t.signupSuccess}
          </div>
        )}

        <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            dir="ltr"
            style={{ width: '100%', padding: '13px 14px', fontSize: 15, border: '1px solid var(--line)', borderRadius: 4, marginBottom: 10, fontFamily: 'inherit' }}
          />
          <input
            type="password"
            required
            minLength={mode === 'signup' ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPlaceholder}
            dir="ltr"
            style={{ width: '100%', padding: '13px 14px', fontSize: 15, border: '1px solid var(--line)', borderRadius: 4, marginBottom: 6, fontFamily: 'inherit' }}
          />
          {mode === 'signup' && (
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>{t.passwordHint}</div>
          )}
          <button type="submit" disabled={status === 'busy'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: mode === 'login' ? 8 : 0 }}>
            {status === 'busy' ? t.loading : mode === 'login' ? t.loginBtn : t.signupBtn}
          </button>
          {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{errorMsg}</div>}
        </form>
      </div>
    </main>
  );
}
