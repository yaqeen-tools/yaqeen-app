import { ShieldMark, Wordmark } from '../../components/Logo';
import { COMPANY } from '../../lib/companyInfo';

export default function PrivacyPage() {
  return (
    <main dir="rtl" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div className="container" style={{ maxWidth: 680, padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <ShieldMark size={48} />
          <Wordmark />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)', margin: '0 0 20px' }}>سياسة الخصوصية</h1>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>البيانات اللي نجمعها</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          نجمع إيميلك عند التسجيل، ونص/ملف العقد اللي ترفعه للتحليل. ما نطلب أي بيانات دفع مباشرة — الدفع يتم عبر مزوّد خارجي مستقل.
        </p>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>كيف نستخدمها</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          نص العقد يُرسل لخدمة ذكاء اصطناعي خارجية (Anthropic) لغرض التحليل فقط، ولا يُستخدم لتدريب أي نموذج. بياناتك معزولة بالكامل عن باقي المستخدمين على مستوى قاعدة البيانات.
        </p>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '24px 0 10px' }}>حذف البيانات</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--ink)' }}>
          تقدر تطلب حذف حسابك وكل بياناتك بأي وقت بالتواصل معنا على {COMPANY.email}.
        </p>

        <a href="/" className="btn btn-ghost" style={{ marginTop: 24 }}>رجوع للرئيسية</a>
      </div>
    </main>
  );
}
