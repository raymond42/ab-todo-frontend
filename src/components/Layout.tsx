import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-background text-foreground transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto bg-background p-6 transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
