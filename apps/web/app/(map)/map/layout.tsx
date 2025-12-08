import TopNav from '@/components/map/top-nav';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
