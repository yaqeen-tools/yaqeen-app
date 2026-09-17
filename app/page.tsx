'use client';

import { useState, useEffect } from 'react';
import { COMPANY } from '../lib/companyInfo';
import { ShieldMark, Wordmark } from '../components/Logo';

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
    pricing_title: 'اختر الباقة المناسبة',
    pricing_body: 'اشتراك شهري، تقدر تلغيه بأي وقت — كل باقة عدد معين من تحليلات العقود شهريًا.',
    plan_basic_name: 'الأساسية',
    plan_basic_price: '49 درهم',
    plan_basic_limit: '10 تحليلات عقود شهريًا',
    plan_pro_name: 'الاحترافية',
    plan_pro_price: '129 درهم',
    plan_pro_limit: '30 تحليل عقد شهريًا',
    plan_business_name: 'الأعمال',
    plan_business_price: '349 درهم',
    plan_business_limit: '100 تحليل عقد شهريًا',
    plan_per_month: '/ شهريًا',
    pricing_cta: 'قريبًا',
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
    pricing_title: 'Choose your plan',
    pricing_body: 'Monthly subscription, cancel anytime — each plan includes a set number of contract analyses per month.',
    plan_basic_name: 'Basic',
    plan_basic_price: 'AED 49',
    plan_basic_limit: '10 contract analyses / month',
    plan_pro_name: 'Pro',
    plan_pro_price: 'AED 129',
    plan_pro_limit: '30 contract analyses / month',
    plan_business_name: 'Business',
    plan_business_price: 'AED 349',
    plan_business_limit: '100 contract analyses / month',
    plan_per_month: '/ month',
    pricing_cta: 'Coming soon',
    footer_about: 'About',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    footer_contact: 'Contact',
    footer_tag: 'Yaqeen — certainty built on precision, not luck',
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
      <header style={{ borderBottom: `1px solid var(--line)`, background: 'var(--navy)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ShieldMark size={44} navy="#fbf7ee" brass="var(--brass-light)" />
            <Wordmark light />
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
            <ShieldMark size={84} navy="#fbf7ee" brass="var(--brass-light)" />
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
          <ShieldMark size={64} />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: 'var(--navy)' }}>{t.trust_title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', margin: 0, maxWidth: 560 }}>{t.trust_body}</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="container" style={{ padding: '60px 24px 88px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: 'var(--navy)', textAlign: 'center' }}>{t.pricing_title}</h2>
        <p style={{ fontSize: 15, color: 'var(--muted)', margin: '0 0 32px', textAlign: 'center' }}>{t.pricing_body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 820, margin: '0 auto' }}>
          {[
            [t.plan_basic_name, t.plan_basic_price, t.plan_basic_limit, false],
            [t.plan_pro_name, t.plan_pro_price, t.plan_pro_limit, true],
            [t.plan_business_name, t.plan_business_price, t.plan_business_limit, false],
          ].map(([name, price, limit, featured]) => (
            <div
              key={name as string}
              className="card"
              style={{
                textAlign: 'center',
                borderTop: featured ? '3px solid var(--brass)' : '3px solid var(--navy)',
                position: 'relative',
              }}
            >
              {featured && (
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brass)', marginBottom: 8, letterSpacing: '0.5px' }}>
                  {lang === 'ar' ? 'الأكثر شيوعًا' : 'MOST POPULAR'}
                </div>
              )}
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{name}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                {price} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>{t.plan_per_month}</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 20 }}>{limit}</div>
              <span className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: 0.55, cursor: 'not-allowed' }}>
                {t.pricing_cta}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid var(--line)`, padding: '32px 0', background: '#f1ebda' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <ShieldMark size={48} />
            <Wordmark />
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 14, fontWeight: 500 }}>{t.footer_tag}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16, lineHeight: 2 }}>
            <div>{COMPANY.email}</div>
            <div>{COMPANY.phone}</div>
            <div>{lang === 'ar' ? COMPANY.addressAr : COMPANY.addressEn}</div>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
            <a href="/about">{t.footer_about}</a>
            <a href="/privacy">{t.footer_privacy}</a>
            <a href="/terms">{t.footer_terms}</a>
            <a href="/contact">{t.footer_contact}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
