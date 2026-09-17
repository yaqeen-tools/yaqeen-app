import { ShieldMark, Wordmark } from '../../components/Logo';

export default function TermsPage() {
  return (
    <main dir="rtl" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div className="container" style={{ maxWidth: 680, padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <ShieldMark size={48} />
          <Wordmark />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)', margin: '0 0 20px' }}>الشروط والأحكام</h1>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>طبيعة الخدمة</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          يقين أداة تحليل استرشادي بالذكاء الاصطناعي، وليست بديلاً عن الاستشارة القانونية. النتائج تحليل أولي فقط، ولازم تُراجَع من محامٍ مرخّص قبل اتخاذ أي قرار قانوني أو مالي.
        </p>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>حدود المسؤولية</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          لا نتحمل أي مسؤولية عن قرارات تُتخذ بناءً على تحليل الأداة وحده دون مراجعة قانونية بشرية.
        </p>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>الاشتراك والإلغاء</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          الاشتراك شهري ويمكن إلغاؤه بأي وقت من إعدادات الحساب، دون رسوم إضافية.
        </p>

        <a href="/" className="btn btn-ghost" style={{ marginTop: 24 }}>رجوع للرئيسية</a>
      </div>
    </main>
  );
}
