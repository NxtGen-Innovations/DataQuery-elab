import { Sidebar } from "@/components/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ds-app-shell flex min-h-screen">
      <Sidebar />
      <main className="min-h-screen flex-1 pl-[88px] xl:pl-[248px]">
        {children}
      </main>
    </div>
  );
}
