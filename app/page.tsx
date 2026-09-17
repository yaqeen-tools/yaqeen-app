'use client';

import { useState, useEffect } from 'react';

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
  },
} as const;

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
      <header style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <span style={{ fontSize: 19, fontWeight: 600, color: 'var(--teal-deep)' }}>
            {lang === 'ar' ? 'يقين' : 'Yaqeen'}
          </span>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="btn btn-ghost"
            style={{ padding: '8px 16px', fontSize: 14 }}
          >
            {t.nav_toggle}
          </button>
        </div>
      </header>

      <section className="container" style={{ padding: '76px 24px 56px', maxWidth: 720 }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.25, fontWeight: 600, color: 'var(--teal-deep)', margin: '0 0 20px' }}>
          {t.hero_title}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--muted)', margin: '0 0 32px' }}>
          {t.hero_sub}
        </p>
        <a href="#pricing" className="btn btn-primary">{t.cta}</a>
      </section>

      <section className="container" style={{ padding: '40px 24px' }}>
        <div className="card" style={{ borderInlineStart: `3px solid var(--danger)`, borderRadius: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 12px' }}>{t.problem_title}</h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted)', margin: 0 }}>{t.problem_body}</p>
        </div>
      </section>

      <section className="container" style={{ padding: '56px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 28px', color: 'var(--teal-deep)' }}>{t.steps_title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {[[t.step1_t, t.step1_d, '1'], [t.step2_t, t.step2_d, '2'], [t.step3_t, t.step3_d, '3']].map(([title, desc, n]) => (
            <div key={n} className="card">
              <div style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600, marginBottom: 10 }}>{n}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '40px 24px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 12px' }}>{t.trust_title}</h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'var(--muted)' }}>{t.trust_body}</p>
      </section>

      <section id="pricing" className="container" style={{ padding: '40px 24px 80px' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 10px' }}>{t.pricing_title}</h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', margin: '0 0 24px' }}>{t.pricing_body}</p>
          <span className="btn btn-primary" style={{ opacity: 0.6, cursor: 'not-allowed' }}>{t.pricing_cta}</span>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--line)', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 24, fontSize: 13.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span>{t.footer_about}</span>
          <span>{t.footer_privacy}</span>
          <span>{t.footer_terms}</span>
          <span>{t.footer_contact}</span>
        </div>
      </footer>
    </main>
  );
}
