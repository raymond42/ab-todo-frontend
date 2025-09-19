import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Star,
  Share2,
  SlidersHorizontal,
  List,
  LayoutGrid,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { to: "/", label: "Kanban", icon: <LayoutGrid size={16} /> },
  { to: "/list", label: "List", icon: <List size={16} /> },
  { to: "/calendar", label: "Calendar", icon: <CalendarDays size={16} /> },
];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Left Section */}
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <span>Shared Pages</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="font-medium text-gray-700">HR Tasks Hub</span>
        </div>

        {/* Title + Description */}
        <h1 className="text-lg font-semibold">HR Tasks Hub 🧑‍💼</h1>
        <p className="text-sm text-gray-500">
          Welcome to the Human Resources hub
        </p>

        {/* Tabs */}
        <nav className="flex gap-2 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded-md text-sm ${
                  isActive
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Input placeholder="Search here" className="w-56" />
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="mr-1 h-4 w-4" /> Filter
        </Button>
        <Button variant="outline" size="sm">
          Sort
        </Button>
        <Button variant="ghost" size="sm">
          <Star />
        </Button>
        {/* Avatars */}
        <div className="flex -space-x-2">
          <img
            src="/avatars/user1.png"
            alt="User 1"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="/avatars/user2.png"
            alt="User 2"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="/avatars/user3.png"
            alt="User 3"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-1 h-4 w-4" /> Share
        </Button>
      </div>
    </header>
  );
}
