'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const copy = {
  ar: {
    dir: 'rtl',
    title: 'تسجيل الدخول',
    sub: 'أدخل إيميلك وراح نرسل لك رابط دخول مباشر — بدون كلمة مرور.',
    placeholder: 'you@company.com',
    btn: 'أرسل رابط الدخول',
    sending: 'جاري الإرسال...',
    sent: 'تفقّد بريدك — أرسلنا لك رابط دخول مباشر.',
    error: 'صار خطأ، حاول مرة ثانية.',
  },
  en: {
    dir: 'ltr',
    title: 'Sign in',
    sub: "Enter your email and we'll send you a direct sign-in link — no password.",
    placeholder: 'you@company.com',
    btn: 'Send sign-in link',
    sending: 'Sending...',
    sent: 'Check your inbox — we sent you a sign-in link.',
    error: 'Something went wrong, try again.',
  },
} as const;

export default function LoginPage() {
  const [lang] = useState<'ar' | 'en'>('ar');
  const t = copy[lang];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.auth.signInWithOtp({ email });
    setStatus(error ? 'error' : 'sent');
  }

  return (
    <main dir={t.dir} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%', margin: 20, borderTop: '3px solid var(--navy)' }}>
        <div style={{ marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="37" fill="none" stroke="var(--navy)" strokeWidth="3" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
            <path d="M24 41 L35 52 L57 27" fill="none" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>{t.title}</h1>
        <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.6 }}>{t.sub}</p>

        {status === 'sent' ? (
          <div style={{ fontSize: 14.5, color: 'var(--navy)', background: '#f1ebda', padding: 16, borderRadius: 4 }}>{t.sent}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              style={{
                width: '100%',
                padding: '13px 14px',
                fontSize: 15,
                border: '1px solid var(--line)',
                borderRadius: 4,
                marginBottom: 14,
                fontFamily: 'inherit',
              }}
            />
            <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {status === 'sending' ? t.sending : t.btn}
            </button>
            {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{t.error}</div>}
          </form>
        )}
      </div>
    </main>
  );
}
