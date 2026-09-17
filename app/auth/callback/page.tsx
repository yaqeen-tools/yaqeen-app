'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { ShieldMark, Wordmark } from '../../../components/Logo';

export default function AuthCallbackPage() {
  const [state, setState] = useState<'checking' | 'success' | 'no-session' | 'error'>('checking');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hasHashTokens = hash.includes('access_token');
    const hasErrorInHash = hash.includes('error');

    setDebugInfo(
      `hash present: ${hash.length > 0} | has access_token: ${hasHashTokens} | has error: ${hasErrorInHash} | raw hash: ${hash.slice(0, 120)}`
    );

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setState('success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 800);
      } else if (event === 'INITIAL_SESSION') {
        if (session) {
          setState('success');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 800);
        } else {
          setState('no-session');
        }
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <main dir="rtl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div className="card" style={{ maxWidth: 480, width: '100%', margin: 20, borderTop: '3px solid var(--navy)' }}>
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <ShieldMark size={44} />
          <Wordmark />
        </div>

        {state === 'checking' && (
          <div style={{ color: 'var(--muted)', fontSize: 15 }}>جاري التحقق من رابط الدخول...</div>
        )}

        {state === 'success' && (
          <div style={{ color: 'var(--navy)', fontSize: 15, fontWeight: 600 }}>نجح الدخول! جاري تحويلك للوحة التحكم...</div>
        )}

        {state === 'no-session' && (
          <div>
            <div style={{ color: 'var(--danger)', fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
              الرابط ما رجّع جلسة دخول صالحة.
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12.5, marginBottom: 16 }}>
              الأسباب المحتملة: الرابط منتهي الصلاحية، أو استُخدم من قبل، أو تم فتحه من متصفح مختلف عن اللي طلبت منه الرمز.
            </div>
            <a href="/login" className="btn btn-primary">ارجع لصفحة الدخول واطلب رابط جديد</a>
            <div style={{ marginTop: 20, padding: 12, background: '#f1ebda', borderRadius: 4, fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {debugInfo}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
