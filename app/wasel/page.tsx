'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ShieldMark, Wordmark } from '../../components/Logo';

type Customer = {
  id: string;
  phone_number: string;
  name: string | null;
  status: string;
  last_summary: string | null;
  last_message_at: string | null;
};

const statusLabel: Record<string, string> = {
  new: 'جديد',
  pending: 'معلّق',
  completed: 'مكتمل',
  lost: 'ضائع',
};
const statusColor: Record<string, string> = {
  new: 'var(--brass)',
  pending: 'var(--danger)',
  completed: 'var(--navy)',
  lost: 'var(--muted)',
};

export default function WaselPage() {
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [reminderDays, setReminderDays] = useState(3);
  const [saving, setSaving] = useState(false);

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) {
      window.location.href = '/login';
      return;
    }

    const { data: memberships } = await supabase.from('memberships').select('organization_id').limit(1);
    const org = memberships?.[0] as any;
    if (!org) {
      setLoading(false);
      return;
    }
    setOrgId(org.organization_id);

    const { data: settings } = await supabase
      .from('wasel_settings')
      .select('whatsapp_phone_number_id, reminder_days')
      .eq('organization_id', org.organization_id)
      .single();
    if (settings) {
      setPhoneNumberId(settings.whatsapp_phone_number_id ?? '');
      setReminderDays(settings.reminder_days ?? 3);
    }

    const { data: customersData } = await supabase
      .from('wasel_customers')
      .select('id, phone_number, name, status, last_summary, last_message_at')
      .order('last_message_at', { ascending: false, nullsFirst: false });
    setCustomers(customersData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') loadData();
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    setSaving(true);
    await supabase.from('wasel_settings').upsert({
      organization_id: orgId,
      whatsapp_phone_number_id: phoneNumberId || null,
      reminder_days: reminderDays,
    });
    setSaving(false);
  }

  function daysAgo(dateStr: string | null) {
    if (!dateStr) return null;
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    return days;
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ color: 'var(--muted)' }}>...جاري التحميل</div>
      </main>
    );
  }

  return (
    <main dir="rtl" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <header style={{ background: 'var(--navy)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShieldMark size={38} navy="#fbf7ee" brass="var(--brass-light)" />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fbf7ee' }}>واصل — Wasel</div>
              <div style={{ fontSize: 10.5, color: 'rgba(251,247,238,0.6)' }}>بواسطة يقين</div>
            </div>
          </div>
          <a href="/dashboard" className="btn" style={{ padding: '8px 16px', fontSize: 13.5, background: 'transparent', color: '#fbf7ee', border: '1px solid rgba(251,247,238,0.35)' }}>
            لوحة يقين
          </a>
        </div>
      </header>

      <div className="container" style={{ padding: '40px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', margin: '0 0 24px' }}>عملاء واتساب</h1>

        <div className="card" style={{ marginBottom: 30, borderTop: '3px solid var(--brass)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 14px' }}>ربط حساب واتساب بزنس</h2>
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ fontSize: 12.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Phone Number ID (من Meta for Developers)</label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="مثال: 123456789012345"
                dir="ltr"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ width: 140 }}>
              <label style={{ fontSize: 12.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>تذكير بعد (أيام)</label>
              <input
                type="number"
                min={1}
                value={reminderDays}
                onChange={(e) => setReminderDays(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'inherit' }}
              />
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
          </form>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
            بدون ربط رقم واتساب بزنس فعلي عبر Meta، هذي القائمة تظل فاضية — العملاء يُضافون تلقائيًا فور وصول أول رسالة حقيقية.
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>العملاء ({customers.length})</h2>
        {customers.length === 0 ? (
          <div className="card" style={{ color: 'var(--muted)', fontSize: 14.5 }}>ما فيه عملاء بعد — راح يظهرون هنا تلقائيًا فور أول محادثة واتساب.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {customers.map((c) => {
              const days = daysAgo(c.last_message_at);
              const needsFollowup = c.status === 'pending' && days !== null && days >= reminderDays;
              return (
                <div key={c.id} className="card" style={{ padding: 16, borderInlineStart: needsFollowup ? '3px solid var(--danger)' : undefined }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{c.name || c.phone_number}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }} dir="ltr">{c.phone_number}</div>
                      {c.last_summary && <div style={{ fontSize: 13.5, color: 'var(--ink)', marginTop: 8 }}>{c.last_summary}</div>}
                      {needsFollowup && (
                        <div style={{ fontSize: 12.5, color: 'var(--danger)', fontWeight: 600, marginTop: 6 }}>
                          ⚠ ما رد عليه من {days} يوم — يحتاج متابعة
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: statusColor[c.status] ?? 'var(--muted)', padding: '4px 10px', borderRadius: 20, background: '#f1ebda', whiteSpace: 'nowrap' }}>
                      {statusLabel[c.status] ?? c.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
