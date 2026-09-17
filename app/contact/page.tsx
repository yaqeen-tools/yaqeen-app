import { ShieldMark, Wordmark } from '../../components/Logo';
import { COMPANY } from '../../lib/companyInfo';

export default function ContactPage() {
  return (
    <main dir="rtl" style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div className="container" style={{ maxWidth: 680, padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <ShieldMark size={48} />
          <Wordmark />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)', margin: '0 0 20px' }}>تواصل معنا</h1>
        <div style={{ fontSize: 15.5, lineHeight: 2.2, color: 'var(--ink)' }}>
          <div>{COMPANY.email}</div>
          <div>{COMPANY.phone}</div>
          <div>{COMPANY.addressAr}</div>
        </div>
        <a href="/" className="btn btn-ghost" style={{ marginTop: 24 }}>رجوع للرئيسية</a>
      </div>
    </main>
  );
}
