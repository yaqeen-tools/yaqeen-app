import './globals.css';

export const metadata = {
  title: {
    default: 'يقين — Yaqeen | مراجعة العقود التجارية بالذكاء الاصطناعي',
    template: '%s | يقين — Yaqeen',
  },
  description: 'اكتشف البنود الخطرة في عقودك التجارية قبل التوقيع. Yaqeen — AI-powered contract review for Gulf SMEs, in Arabic and English.',
  applicationName: 'يقين — Yaqeen',
  openGraph: {
    title: 'يقين — Yaqeen',
    description: 'اكتشف البنود الخطرة في عقودك التجارية قبل التوقيع.',
    locale: 'ar_AE',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body data-lang="ar">{children}</body>
    </html>
  );
}
