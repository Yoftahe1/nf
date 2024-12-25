import { AppSidebar } from './app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        <main className="container max-w-3xl py-4 h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
