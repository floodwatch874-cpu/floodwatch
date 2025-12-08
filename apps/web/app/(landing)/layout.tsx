import TopNav from '@/components/landing/top-nav';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dito ilalagay ung topnav or footer.
    <>
      <TopNav />
      <main>{children}</main>
      {/* footer */}
    </>
  );
}
