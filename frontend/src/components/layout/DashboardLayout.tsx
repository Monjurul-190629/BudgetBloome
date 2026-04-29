"use client";

import BottomNavbar from "./BottomNavbar";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col gap-4 p-4 overflow-hidden">
      <Header />
      <div className="flex gap-4 flex-1 min-h-0">
        <aside className="max-md:hidden h-full">
          <Sidebar />
        </aside>
        <main className="flex-1 min-w-0 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNavbar />
    </div>
  );
}
