import HeaderPayment from '@/app/[lang]/(user)/(root)/payment/[id]/components/HeaderPayment';

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderPayment />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
