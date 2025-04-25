export default function SectionDashboardLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-full flex lg:px-40 md:px-20 px-4 ${className}`}>
      {children}
    </section>
  );
}
