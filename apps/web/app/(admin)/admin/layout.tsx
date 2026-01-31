import SideNav from '@/components/admin/side-nav';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="flex py-4 pe-4 w-full h-screen">{children}</main>
    </SidebarProvider>
  );
}
