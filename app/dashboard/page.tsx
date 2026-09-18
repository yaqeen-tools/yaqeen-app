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
  raw_text: string | null;
};

type Finding = {
  id: string;
  severity: string;
  title: string;
  description: string;
  clause_reference: string | null;
  legal_reference: string | null;
};

const copy = {
  ar: {
    dir: 'rtl',
    toggle: 'English',
    logout: 'تسجيل خروج',
    defaultOrg: 'مؤسستي',
    currentPlan: 'باقتك الحالية',
    planNames: { basic: 'الأساسية', pro: 'الاحترافية', business: 'الأعمال' } as Record<string, string>,
    usage: 'الاستخدام هذا الشهر',
    analysesWord: 'تحليل',
    upgrade: 'ترقية الباقة',
    upgradeSubject: 'طلب ترقية باقة يقين',
    upgradeBody: (plan: string, email: string) => `أبي أرقّي باقتي من "${plan}" لباقة أعلى. إيميل حسابي: ${email}`,
    addTitle: 'إضافة عقد جديد',
    titlePlaceholder: 'اسم العقد (مثال: عقد إيجار محل - 2026)',
    textPlaceholder: 'الصق نص العقد هنا (مطلوب للتحليل بالذكاء الاصطناعي)',
    fileNote: 'الملف يُحفظ كمرجع فقط — التحليل الفعلي يعتمد على النص المكتوب أعلاه.',
    adding: 'جاري الإضافة...',
    add: 'إضافة',
    addError: 'صار خطأ، حاول مرة ثانية',
    contractsTitle: 'العقود',
    noContracts: 'ما فيه عقود بعد — أضف أول عقد فوق.',
    fileAttached: 'ملف مرفق',
    noFile: 'بدون ملف',
    statusProcessing: 'بانتظار التحليل',
    statusAnalyzed: 'تم التحليل',
    statusFailed: 'فشل التحليل',
    hideResults: 'إخفاء النتائج',
    showResults: 'عرض النتائج',
    analyzing: 'جاري التحليل...',
    retry: 'إعادة المحاولة',
    analyze: 'حلل العقد',
    needTextOrFile: 'أضف نص أو ملف أولاً',
    genericAnalyzeError: 'صار خطأ بالتحليل',
    connectionError: 'تعذر الوصول لخدمة التحليل',
    disclaimer: 'تنويه: هذا تحليل استرشادي أولي بالذكاء الاصطناعي، ولا يغني عن مراجعة محامٍ مرخّص قبل اتخاذ أي قرار.',
    noFindings: 'ما فيه ملاحظات.',
    exportWord: 'تصدير Word',
    clauseLabel: 'البند',
    legalLabel: 'المصدر القانوني',
    severity: { high: 'خطورة عالية', medium: 'خطورة متوسطة', low: 'خطورة منخفضة', info: 'ملاحظة' } as Record<string, string>,
    loading: '...جاري التحميل',
    locale: 'ar-AE',
  },
  en: {
    dir: 'ltr',
    toggle: 'العربية',
    logout: 'Sign out',
    defaultOrg: 'My company',
    currentPlan: 'Current plan',
    planNames: { basic: 'Basic', pro: 'Pro', business: 'Business' } as Record<string, string>,
    usage: 'Usage this month',
    analysesWord: 'analyses',
    upgrade: 'Upgrade plan',
    upgradeSubject: 'Yaqeen plan upgrade request',
    upgradeBody: (plan: string, email: string) => `I'd like to upgrade my plan from "${plan}" to a higher tier. My account email: ${email}`,
    addTitle: 'Add a new contract',
    titlePlaceholder: 'Contract name (e.g. Shop Lease Agreement - 2026)',
    textPlaceholder: 'Paste the contract text here (required for AI analysis)',
    fileNote: 'The file is stored for reference only — analysis runs on the text above.',
    adding: 'Adding...',
    add: 'Add',
    addError: 'Something went wrong, try again',
    contractsTitle: 'Contracts',
    noContracts: 'No contracts yet — add your first one above.',
    fileAttached: 'File attached',
    noFile: 'No file',
    statusProcessing: 'Awaiting analysis',
    statusAnalyzed: 'Analyzed',
    statusFailed: 'Analysis failed',
    hideResults: 'Hide results',
    showResults: 'Show results',
    analyzing: 'Analyzing...',
    retry: 'Retry',
    analyze: 'Analyze contract',
    needTextOrFile: 'Add text or a file first',
    genericAnalyzeError: 'Analysis failed',
    connectionError: 'Could not reach the analysis service',
    disclaimer: 'Note: this is a preliminary AI-guided analysis and does not replace review by a licensed lawyer before any decision.',
    noFindings: 'No findings.',
    exportWord: 'Export Word',
    clauseLabel: 'Clause',
    legalLabel: 'Legal reference',
    severity: { high: 'High risk', medium: 'Medium risk', low: 'Low risk', info: 'Note' } as Record<string, string>,
    loading: 'Loading...',
    locale: 'en-US',
  },
} as const;

const severityColor: Record<string, string> = {
  high: 'var(--danger)',
  medium: 'var(--brass)',
  low: 'var(--navy)',
  info: 'var(--muted)',
};

export default function DashboardPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = copy[lang];
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>('basic');
  const [monthlyLimit, setMonthlyLimit] = useState<number>(10);
  const [usedThisMonth, setUsedThisMonth] = useState<number>(0);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [title, setTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analyzeError, setAnalyzeError] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [findingsMap, setFindingsMap] = useState<Record<string, Finding[]>>({});

  async function loadData() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setUserEmail(user.email ?? null);

    const { data: memberships } = await supabase
      .from('memberships')
      .select('organization_id, organizations(name, plan, monthly_limit)')
      .limit(1);

    const org = memberships?.[0] as any;
    if (org?.organization_id) setOrgId(org.organization_id);
    if (org?.organizations?.name) setOrgName(org.organizations.name);
    if (org?.organizations?.plan) setPlan(org.organizations.plan);
    if (org?.organizations?.monthly_limit) setMonthlyLimit(org.organizations.monthly_limit);

    if (org?.organization_id) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from('audit_events')
        .select('id', { count: 'exact', head: true })
        .eq('organization_id', org.organization_id)
        .eq('event_type', 'contract_analysis')
        .gte('created_at', startOfMonth.toISOString());
      setUsedThisMonth(count ?? 0);
    }

    const { data: contractsData } = await supabase
      .from('contracts')
      .select('id, title, language, status, created_at, file_path, raw_text')
      .order('created_at', { ascending: false });

    setContracts(contractsData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        loadData();
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  async function handleAddContract(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() && !rawText.trim() && !file) return;
    if (!orgId) return;
    setAdding(true);
    setAddError('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const finalTitle = title.trim() || file?.name.replace(/\.[^.]+$/, '') || (lang === 'ar' ? 'عقد بدون اسم' : 'Untitled contract');

    const { data: inserted, error: insertError } = await supabase
      .from('contracts')
      .insert({ organization_id: orgId, uploaded_by: user.id, title: finalTitle, language: lang, status: 'processing', raw_text: rawText || null })
      .select('id')
      .single();

    if (insertError || !inserted) {
      setAddError(t.addError);
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
    setRawText('');
    setFile(null);
    setAdding(false);
    await loadData();
  }

  function handleExportWord(contract: Contract, findings: Finding[]) {
    const rows = findings
      .map(
        (f) => `
      <tr>
        <td style="padding:8px;border:1px solid #ccc;font-weight:bold;">${t.severity[f.severity] ?? f.severity}</td>
        <td style="padding:8px;border:1px solid #ccc;">
          <div style="font-weight:bold;margin-bottom:4px;">${f.title}</div>
          <div style="margin-bottom:6px;">${f.description}</div>
          ${f.clause_reference ? `<div style="font-size:12px;color:#555;">${t.clauseLabel}: ${f.clause_reference}</div>` : ''}
          ${f.legal_reference ? `<div style="font-size:12px;color:#a6752c;">${t.legalLabel}: ${f.legal_reference}</div>` : ''}
        </td>
      </tr>`
      )
      .join('');

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>${contract.title}</title></head>
      <body dir="${t.dir}" style="font-family:Arial, sans-serif;">
        <h1 style="color:#16283d;">يقين — Yaqeen</h1>
        <div style="font-size:11px;color:#a6752c;letter-spacing:1px;margin-bottom:20px;">YAQEEN DIGITAL SOLUTIONS</div>
        <h2 style="color:#16283d;">${contract.title}</h2>
        <p style="color:#555;font-size:13px;">${new Date(contract.created_at).toLocaleDateString(t.locale)}</p>
        <p style="font-size:12px;color:#777;background:#f1ebda;padding:10px;">${t.disclaimer}</p>
        <table style="border-collapse:collapse;width:100%;margin-top:16px;">
          ${rows}
        </table>
        <p style="margin-top:24px;font-size:11px;color:#999;">${COMPANY.email} · ${COMPANY.phone}</p>
      </body>
      </html>`;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contract.title}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleAnalyze(contractId: string) {
    setAnalyzingId(contractId);
    setAnalyzeError((prev) => ({ ...prev, [contractId]: '' }));

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    try {
      const res = await fetch('https://qtixhhztkuyqgsflhmkt.supabase.co/functions/v1/analyze-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contract_id: contractId }),
      });
      const result = await res.json();
      if (!res.ok) {
        setAnalyzeError((prev) => ({ ...prev, [contractId]: result.error || t.genericAnalyzeError }));
      } else {
        await loadFindings(contractId);
        await loadData();
        setExpandedId(contractId);
      }
    } catch (err) {
      setAnalyzeError((prev) => ({ ...prev, [contractId]: t.connectionError }));
    }
    setAnalyzingId(null);
  }

  async function loadFindings(contractId: string) {
    const { data } = await supabase
      .from('contract_findings')
      .select('id, severity, title, description, clause_reference, legal_reference')
      .eq('contract_id', contractId)
      .order('created_at', { ascending: true });
    setFindingsMap((prev) => ({ ...prev, [contractId]: data ?? [] }));
  }

  async function toggleExpand(contractId: string) {
    if (expandedId === contractId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(contractId);
    if (!findingsMap[contractId]) {
      await loadFindings(contractId);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ color: 'var(--muted)' }}>{t.loading}</div>
      </main>
    );
  }

  return (
    <main dir={t.dir} style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <header style={{ background: 'var(--navy)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ShieldMark size={38} navy="#fbf7ee" brass="var(--brass-light)" />
            <Wordmark light />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              style={{ padding: '8px 14px', fontSize: 13, background: 'transparent', color: '#fbf7ee', border: '1px solid rgba(251,247,238,0.35)', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              {t.toggle}
            </button>
            <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', fontSize: 13.5, background: 'transparent', color: '#fbf7ee', border: '1px solid rgba(251,247,238,0.35)' }}>
              {t.logout}
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '40px 24px' }}>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{userEmail}</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', margin: '4px 0 0' }}>{orgName ?? t.defaultOrg}</h1>
        </div>

        <div className="card" style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 4 }}>{t.currentPlan}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)' }}>{t.planNames[plan] ?? plan}</div>
          </div>
          <div style={{ textAlign: lang === 'ar' ? 'left' : 'right' }}>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 4 }}>{t.usage}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: usedThisMonth >= monthlyLimit ? 'var(--danger)' : 'var(--navy)' }}>
              {usedThisMonth} / {monthlyLimit} {t.analysesWord}
            </div>
          </div>
          {plan !== 'business' && (
            <a
              href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(t.upgradeSubject)}&body=${encodeURIComponent(t.upgradeBody(t.planNames[plan] ?? plan, userEmail ?? ''))}`}
              className="btn btn-ghost"
              style={{ padding: '8px 16px', fontSize: 13 }}
            >
              {t.upgrade}
            </a>
          )}
        </div>

        <div className="card" style={{ marginBottom: 30, borderTop: '3px solid var(--brass)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '0 0 14px' }}>{t.addTitle}</h2>
          <form onSubmit={handleAddContract} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder + (lang === 'ar' ? ' (اختياري)' : ' (optional)')}
              style={{ padding: '12px 14px', fontSize: 14.5, border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'inherit' }}
            />
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={t.textPlaceholder}
              rows={5}
              style={{ padding: '12px 14px', fontSize: 14, border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'inherit', resize: 'vertical' }}
            />
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ fontSize: 13.5, color: 'var(--muted)' }}
            />
            <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{t.fileNote}</div>
            <button type="submit" disabled={adding} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {adding ? t.adding : t.add}
            </button>
            {addError && <div style={{ color: 'var(--danger)', fontSize: 13.5 }}>{addError}</div>}
          </form>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>{t.contractsTitle}</h2>
        {contracts.length === 0 ? (
          <div className="card" style={{ color: 'var(--muted)', fontSize: 14.5 }}>{t.noContracts}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contracts.map((c) => (
              <div key={c.id} className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{c.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
                      {new Date(c.created_at).toLocaleDateString(t.locale)}
                      {' · '}
                      {c.file_path ? t.fileAttached : t.noFile}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        padding: '5px 12px',
                        borderRadius: 20,
                        background: c.status === 'analyzed' ? '#e7f0ea' : c.status === 'failed' ? '#fbe9e6' : '#f1ebda',
                        color: c.status === 'analyzed' ? 'var(--navy)' : c.status === 'failed' ? 'var(--danger)' : 'var(--brass)',
                      }}
                    >
                      {c.status === 'processing' ? t.statusProcessing : c.status === 'analyzed' ? t.statusAnalyzed : c.status === 'failed' ? t.statusFailed : c.status}
                    </span>
                    {c.status === 'analyzed' ? (
                      <button onClick={() => toggleExpand(c.id)} className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 13 }}>
                        {expandedId === c.id ? t.hideResults : t.showResults}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAnalyze(c.id)}
                        disabled={analyzingId === c.id || (!c.raw_text && !c.file_path)}
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', fontSize: 13 }}
                        title={!c.raw_text && !c.file_path ? t.needTextOrFile : ''}
                      >
                        {analyzingId === c.id ? t.analyzing : c.status === 'failed' ? t.retry : t.analyze}
                      </button>
                    )}
                  </div>
                </div>

                {analyzeError[c.id] && (
                  <div style={{ color: 'var(--danger)', fontSize: 13, marginTop: 10 }}>{analyzeError[c.id]}</div>
                )}

                {expandedId === c.id && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{t.disclaimer}</div>
                      {(findingsMap[c.id] ?? []).length > 0 && (
                        <button
                          onClick={() => handleExportWord(c, findingsMap[c.id])}
                          className="btn btn-ghost"
                          style={{ padding: '6px 12px', fontSize: 12.5, whiteSpace: 'nowrap' }}
                        >
                          {t.exportWord}
                        </button>
                      )}
                    </div>
                    {(findingsMap[c.id] ?? []).length === 0 ? (
                      <div style={{ fontSize: 13.5, color: 'var(--muted)' }}>{t.noFindings}</div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {findingsMap[c.id].map((f) => (
                          <div key={f.id} style={{ borderInlineStart: `3px solid ${severityColor[f.severity] ?? 'var(--muted)'}`, paddingInlineStart: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 11.5, fontWeight: 700, color: severityColor[f.severity] ?? 'var(--muted)' }}>
                                {t.severity[f.severity] ?? f.severity}
                              </span>
                              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{f.title}</span>
                            </div>
                            <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.7, marginBottom: 6 }}>{f.description}</div>
                            {f.clause_reference && (
                              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>{t.clauseLabel}: {f.clause_reference}</div>
                            )}
                            {f.legal_reference && (
                              <div style={{ fontSize: 12, color: 'var(--brass)', fontWeight: 500 }}>{t.legalLabel}: {f.legal_reference}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
            <div>{lang === 'ar' ? COMPANY.addressAr : COMPANY.addressEn}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
