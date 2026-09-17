import './globals.css';

export const metadata = {
  title: 'يقين — مراجعة العقود التجارية بالذكاء الاصطناعي',
  description: 'اكتشف البنود الخطرة في عقودك التجارية قبل التوقيع. Yaqeen — AI-powered contract review for Gulf SMEs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body data-lang="ar">{children}</body>
    </html>
  );
}
