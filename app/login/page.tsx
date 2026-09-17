'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldMark, Wordmark } from '../../components/Logo';

const copy = {
  ar: {
    dir: 'rtl',
    toggle: 'English',
    title1: 'تسجيل الدخول',
    sub1: 'أدخل إيميلك وراح نرسل لك رمز دخول مكوّن من 6 أرقام.',
    placeholder: 'you@company.com',
    send: 'أرسل رمز الدخول',
    sending: 'جاري الإرسال...',
    title2: 'أدخل الرمز',
    sub2: (email: string) => `أرسلنا رمز مكوّن من 6 أرقام إلى ${email} — تفقّد بريدك (وصندوق الرسائل غير المرغوبة).`,
    verify: 'تأكيد الدخول',
    verifying: 'جاري التحقق...',
    changeEmail: 'تغيير الإيميل',
  },
  en: {
    dir: 'ltr',
    toggle: 'العربية',
    title1: 'Sign in',
    sub1: "Enter your email and we'll send you a 6-digit sign-in code.",
    placeholder: 'you@company.com',
    send: 'Send sign-in code',
    sending: 'Sending...',
    title2: 'Enter the code',
    sub2: (email: string) => `We sent a 6-digit code to ${email} — check your inbox (and spam folder).`,
    verify: 'Confirm sign-in',
    verifying: 'Verifying...',
    changeEmail: 'Change email',
  },
} as const;

export default function LoginPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = copy[lang];
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [status, setStatus] = useState<'idle' | 'busy' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus('busy');
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('idle');
      setStep('code');
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus('busy');
    setErrorMsg('');
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      window.location.href = '/dashboard';
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

        {step === 'email' ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>{t.title1}</h1>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.6 }}>{t.sub1}</p>
            <form onSubmit={handleSendCode}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                dir="ltr"
                style={{ width: '100%', padding: '13px 14px', fontSize: 15, border: '1px solid var(--line)', borderRadius: 4, marginBottom: 14, fontFamily: 'inherit' }}
              />
              <button type="submit" disabled={status === 'busy'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'busy' ? t.sending : t.send}
              </button>
              {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{errorMsg}</div>}
            </form>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>{t.title2}</h1>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.6 }}>{t.sub2(email)}</p>
            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                dir="ltr"
                style={{ width: '100%', padding: '13px 14px', fontSize: 20, letterSpacing: 6, textAlign: 'center', border: '1px solid var(--line)', borderRadius: 4, marginBottom: 14, fontFamily: 'inherit' }}
              />
              <button type="submit" disabled={status === 'busy'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'busy' ? t.verifying : t.verify}
              </button>
              {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{errorMsg}</div>}
            </form>
            <button onClick={() => setStep('email')} style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              {t.changeEmail}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
