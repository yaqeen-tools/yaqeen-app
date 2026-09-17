'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { COMPANY } from '../../lib/companyInfo';
import { ShieldMark, Wordmark } from '../../components/Logo';

type Contract = {
  id: string;
  title: string;
  language: string;
  status: string;
  created_at: string;
  file_path: string | null;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');

  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setUserEmail(user.email ?? null);

    const { data: memberships } = await supabase
      .from('memberships')
      .select('organization_id, organizations(name)')
      .limit(1);

    const org = memberships?.[0] as any;
    if (org?.organization_id) setOrgId(org.organization_id);
    if (org?.organizations?.name) setOrgName(org.organizations.name);

    const { data: contractsData } = await supabase
      .from('contracts')
      .select('id, title, language, status, created_at, file_path')
      .order('created_at', { ascending: false });

    setContracts(contractsData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddContract(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !orgId) return;
    setAdding(true);
    setAddError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: inserted, error: insertError } = await supabase
      .from('contracts')
      .insert({ organization_id: orgId, uploaded_by: user.id, title, language: 'ar', status: 'processing' })
      .select('id')
      .single();

    if (insertError || !inserted) {
      setAddError('صار خطأ، حاول مرة ثانية');
      setAdding(false);
      return;
    }

    if (file) {
      const path = `${orgId}/${inserted.id}/${file.name}`;
      const { error: uploadError } = await supabase.storage.from('contracts').upload(path, file);
      if (!uploadError) {
        await supabase.from('contracts').update({ file_path: path }).eq('id', inserted.id);
      }
    }

    setTitle('');
    setFile(null);
    setAdding(false);
    await loadData();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/login';
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
            <Wordmark light />
          </div>
          <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', fontSize: 13.5, background: 'transparent', color: '#fbf7ee', border: '1px solid rgba(251,247,238,0.35)' }}>
            تسجيل خروج
          </button>
        </div>
      </header>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{userEmail}</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', margin: '4px 0 0' }}>{orgName ?? 'مؤسستي'}</h1>
        </div>

        <div className="card" style={{ marginBottom: 30, borderTop: '3px solid var(--brass)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '0 0 14px' }}>إضافة عقد جديد</h2>
          <form onSubmit={handleAddContract} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اسم العقد (مثال: عقد إيجار محل - 2026)"
              style={{ padding: '12px 14px', fontSize: 14.5, border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'inherit' }}
            />
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ fontSize: 13.5, color: 'var(--muted)' }}
            />
            <button type="submit" disabled={adding} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {adding ? 'جاري الإضافة...' : 'إضافة'}
            </button>
            {addError && <div style={{ color: 'var(--danger)', fontSize: 13.5 }}>{addError}</div>}
          </form>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>العقود</h2>
        {contracts.length === 0 ? (
          <div className="card" style={{ color: 'var(--muted)', fontSize: 14.5 }}>ما فيه عقود بعد — أضف أول عقد فوق.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contracts.map((c) => (
              <div key={c.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 18 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{c.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
                    {new Date(c.created_at).toLocaleDateString('ar-AE')}
                    {c.file_path ? ' · ملف مرفق' : ' · بدون ملف'}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: 20,
                    background: c.status === 'processing' ? '#f1ebda' : '#e7f0ea',
                    color: c.status === 'processing' ? 'var(--brass)' : 'var(--navy)',
                  }}
                >
                  {c.status === 'processing' ? 'قيد التحليل' : c.status === 'analyzed' ? 'تم التحليل' : c.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <ShieldMark size={40} />
            <Wordmark />
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 2 }}>
            <div>{COMPANY.email}</div>
            <div>{COMPANY.phone}</div>
            <div>{COMPANY.addressAr}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
