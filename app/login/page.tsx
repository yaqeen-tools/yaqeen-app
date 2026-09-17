'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
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
    <main dir="rtl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div className="card" style={{ maxWidth: 400, width: '100%', margin: 20, borderTop: '3px solid var(--navy)' }}>
        <div style={{ marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="37" fill="none" stroke="var(--navy)" strokeWidth="3" />
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
            <path d="M24 41 L35 52 L57 27" fill="none" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {step === 'email' ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>تسجيل الدخول</h1>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.6 }}>
              أدخل إيميلك وراح نرسل لك رمز دخول مكوّن من 6 أرقام.
            </p>
            <form onSubmit={handleSendCode}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{ width: '100%', padding: '13px 14px', fontSize: 15, border: '1px solid var(--line)', borderRadius: 4, marginBottom: 14, fontFamily: 'inherit' }}
              />
              <button type="submit" disabled={status === 'busy'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'busy' ? 'جاري الإرسال...' : 'أرسل رمز الدخول'}
              </button>
              {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{errorMsg}</div>}
            </form>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>أدخل الرمز</h1>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', margin: '0 0 24px', lineHeight: 1.6 }}>
              أرسلنا رمز مكوّن من 6 أرقام إلى {email} — تفقّد بريدك (وصندوق الرسائل غير المرغوبة).
            </p>
            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                required
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                style={{ width: '100%', padding: '13px 14px', fontSize: 20, letterSpacing: 6, textAlign: 'center', border: '1px solid var(--line)', borderRadius: 4, marginBottom: 14, fontFamily: 'inherit' }}
              />
              <button type="submit" disabled={status === 'busy'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'busy' ? 'جاري التحقق...' : 'تأكيد الدخول'}
              </button>
              {status === 'error' && <div style={{ color: 'var(--danger)', fontSize: 13.5, marginTop: 10 }}>{errorMsg}</div>}
            </form>
            <button onClick={() => setStep('email')} style={{ marginTop: 14, background: 'none', border: 'none', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              تغيير الإيميل
            </button>
          </>
        )}
      </div>
    </main>
  );
}
