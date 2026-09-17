import { ShieldMark, Wordmark } from '../../components/Logo';
import { COMPANY } from '../../lib/companyInfo';

export default function AboutPage() {
  return (
    <main dir="rtl" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div className="container" style={{ maxWidth: 680, padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <ShieldMark size={48} />
          <Wordmark />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)', margin: '0 0 20px' }}>من نحن</h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.9, color: 'var(--ink)', marginBottom: 16 }}>
          {COMPANY.nameFullAr} منصة سعودية-خليجية تساعد أصحاب المشاريع الصغيرة على مراجعة عقودهم التجارية بالذكاء الاصطناعي، قبل التوقيع، بدلًا من اكتشاف البنود الخطرة بعد فوات الأوان.
        </p>
        <p style={{ fontSize: 15.5, lineHeight: 1.9, color: 'var(--ink)', marginBottom: 16 }}>
          نؤمن إن مراجعة العقد القانونية ما لازم تكون حكرًا على الشركات الكبيرة اللي عندها فرق قانونية. نبنيها ثنائية اللغة (عربي وإنجليزي) بالكامل، ومصممة خصيصًا لسياق العقود التجارية بالخليج.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>
          كل تحليل نقدّمه استرشادي أولي بالذكاء الاصطناعي، ولا يغني عن مراجعة محامٍ مرخّص قبل اتخاذ أي قرار نهائي.
        </p>
        <a href="/" className="btn btn-ghost" style={{ marginTop: 24 }}>رجوع للرئيسية</a>
      </div>
    </main>
  );
}
