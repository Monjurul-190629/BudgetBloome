"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col gap-4 p-4">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-4 min-h-0">
        {/* Sidebar FIXED HEIGHT CONTEXT */}
        <aside className="flex-shrink-0 h-full px-20">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
