'use client';

import { useState, useEffect } from 'react';
import { COMPANY } from '../lib/companyInfo';

const copy = {
  ar: {
    dir: 'rtl',
    nav_toggle: 'English',
    hero_title: 'اقرأ عقدك قبل ما يوقّعك',
    hero_sub: 'يقين يحلل عقود الإيجار والتوريد والشراكة بالذكاء الاصطناعي، ويطلع لك البنود الخطرة والشروط الناقصة خلال دقائق — بدل ما تدفع لمحامٍ 500 درهم عشان تكتشفها بعد فوات الأوان.',
    cta: 'ابدأ مراجعة عقدك',
    problem_title: 'المشكلة اللي كل صاحب عمل صغير يمر فيها',
    problem_body: 'توقّع عقد مورّد أو عقد إيجار محل لأن الوقت ضاغط والمحامي غالي، وبعد أشهر تكتشف بند غرامة تأخير مبالغ فيه، أو شرط تجديد تلقائي ما انتبهت له. الخسارة تصير بعد ما يفوت الأوان.',
    steps_title: 'كيف تشتغل',
    step1_t: 'ارفع العقد',
    step1_d: 'ملف PDF أو صورة — عربي أو إنجليزي',
    step2_t: 'تحليل فوري',
    step2_d: 'يكشف البنود الخطرة والشروط الناقصة مقارنة بمعايير السوق',
    step3_t: 'تقرير واضح',
    step3_d: 'كل ملاحظة مربوطة بالبند نفسه، مع درجة خطورتها',
    trust_title: 'مبني للسوق الخليجي تحديدًا',
    trust_body: 'ثنائي اللغة بالكامل، ومصمم لسياق العقود التجارية المحلية — مو ترجمة لأداة أمريكية.',
    pricing_title: 'اشتراك بسيط، بدون التزام طويل',
    pricing_body: 'خطة شهرية لمراجعة عدد من العقود، تقدر تلغيها بأي وقت.',
    pricing_cta: 'شوف الأسعار',
    footer_about: 'من نحن',
    footer_privacy: 'الخصوصية',
    footer_terms: 'الشروط',
    footer_contact: 'تواصل معنا',
    footer_tag: 'يقين — الثقة مبنية على الدقة، مو على الحظ',
  },
  en: {
    dir: 'ltr',
    nav_toggle: 'العربية',
    hero_title: 'Read your contract before it reads you',
    hero_sub: 'Yaqeen reviews supplier, lease and partnership agreements with AI, surfacing risky clauses and missing terms in minutes — instead of paying a lawyer AED 500 to find them after it is too late.',
    cta: 'Review your contract',
    problem_title: 'The problem every small business owner has faced',
    problem_body: 'You sign a supplier or lease agreement because time is short and lawyers are expensive. Months later you discover an inflated late-payment penalty, or an auto-renewal clause you never noticed. The damage is already done.',
    steps_title: 'How it works',
    step1_t: 'Upload the contract',
    step1_d: 'PDF or scan — Arabic or English',
    step2_t: 'Instant analysis',
    step2_d: 'Flags risky clauses and terms missing against market norms',
    step3_t: 'A clear report',
    step3_d: 'Every finding is tied to the exact clause, with a risk level',
    trust_title: 'Built for the Gulf market specifically',
    trust_body: 'Fully bilingual, and designed for local commercial contract conventions — not a translated US tool.',
    pricing_title: 'Simple subscription, no long commitment',
    pricing_body: 'A monthly plan covering a set number of contracts. Cancel anytime.',
    pricing_cta: 'See pricing',
    footer_about: 'About',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_contact: 'Contact',
    footer_tag: 'Yaqeen — certainty built on precision, not luck',
  },
} as const;

function Seal({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className="seal" aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="none" stroke="var(--navy)" strokeWidth="3" />
      <circle cx="40" cy="40" r="30" fill="none" stroke="var(--brass)" strokeWidth="1.5" />
      <path d="M24 41 L35 52 L57 27" fill="none" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const t = copy[lang];

  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', t.dir);
  }, [lang, t.dir]);

  return (
    <main dir={t.dir}>
      <header style={{ borderBottom: `1px solid var(--line)`, background: 'var(--navy)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="34" height="34" viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="37" fill="none" stroke="#fbf7ee" strokeWidth="3" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="var(--brass-light)" strokeWidth="1.5" />
              <path d="M24 41 L35 52 L57 27" fill="none" stroke="#fbf7ee" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 21, fontWeight: 700, color: '#fbf7ee', letterSpacing: '0.3px' }}>
              {lang === 'ar' ? 'يقين' : 'Yaqeen'}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="btn"
            style={{ padding: '9px 18px', fontSize: 14, background: 'transparent', color: '#fbf7ee', border: '1px solid rgba(251,247,238,0.35)' }}
          >
            {t.nav_toggle}
          </button>
        </div>
      </header>

      <section style={{ background: 'var(--navy)', paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 760, paddingTop: 56 }}>
          <div style={{ marginBottom: 28 }}>
            <Seal size={56} />
          </div>
          <h1 style={{ fontSize: 46, lineHeight: 1.2, fontWeight: 700, color: '#fbf7ee', margin: '0 0 22px', letterSpacing: '-0.3px' }}>
            {t.hero_title}
          </h1>
          <p style={{ fontSize: 17.5, lineHeight: 1.8, color: 'rgba(251,247,238,0.78)', margin: '0 0 34px', maxWidth: 620 }}>
            {t.hero_sub}
          </p>
          <a href="/login" className="btn" style={{ background: 'var(--brass)', color: '#191510' }}>{t.cta}</a>
        </div>
      </section>

      <section className="container" style={{ padding: '48px 24px 0' }}>
        <div className="card" style={{ borderInlineStart: `4px solid var(--danger)`, borderRadius: '0 4px 4px 0' }}>
          <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 12px', color: 'var(--navy)' }}>{t.problem_title}</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>{t.problem_body}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '60px 24px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 30px', color: 'var(--navy)' }}>{t.steps_title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20 }}>
          {[[t.step1_t, t.step1_d], [t.step2_t, t.step2_d], [t.step3_t, t.step3_d]].map(([title, desc], i) => (
            <div key={title} className="card" style={{ borderTop: `3px solid var(--brass)` }}>
              <div style={{ fontSize: 13, color: 'var(--brass)', fontWeight: 700, marginBottom: 12, letterSpacing: '0.5px' }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 16.5, fontWeight: 700, marginBottom: 8, color: 'var(--navy)' }}>{title}</div>
              <div style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f1ebda', padding: '48px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Seal size={44} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: 'var(--navy)' }}>{t.trust_title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: 0, maxWidth: 560 }}>{t.trust_body}</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="container" style={{ padding: '60px 24px 88px' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto', borderTop: `3px solid var(--navy)` }}>
          <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 10px', color: 'var(--navy)' }}>{t.pricing_title}</h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', margin: '0 0 26px' }}>{t.pricing_body}</p>
          <span className="btn btn-primary" style={{ opacity: 0.55, cursor: 'not-allowed' }}>{t.pricing_cta}</span>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid var(--line)`, padding: '32px 0', background: '#f1ebda' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <svg width="24" height="24" viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="37" fill="none" stroke="var(--navy)" strokeWidth="3" />
              <path d="M24 41 L35 52 L57 27" fill="none" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{lang === 'ar' ? COMPANY.nameAr : COMPANY.nameEn}</span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 14, fontWeight: 500 }}>{t.footer_tag}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 2 }}>
            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 4 }}>
              {COMPANY.nameFullAr} — {COMPANY.nameFullEn}
            </div>
            <div>{COMPANY.email}</div>
            <div>{COMPANY.phone}</div>
            <div>{lang === 'ar' ? COMPANY.addressAr : COMPANY.addressEn}</div>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
            <span>{t.footer_about}</span>
            <span>{t.footer_privacy}</span>
            <span>{t.footer_terms}</span>
            <span>{t.footer_contact}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
