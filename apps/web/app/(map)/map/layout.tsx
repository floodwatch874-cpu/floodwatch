import TopNav from '@/components/map/top-nav';
import { PanelContextProvider } from '@/contexts/panel-context';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PanelContextProvider>
      <div className="flex flex-col h-dvh overscroll-none overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </PanelContextProvider>
  );
}
