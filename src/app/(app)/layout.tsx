import { Sidebar } from "@/components/sidebar";
import { RightSidebar } from "@/components/right-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#080808]">
      <Sidebar />
      <main className="flex-1 ml-[72px] xl:mr-[280px] min-h-screen">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
