import {
  Home,
  Calendar,
  Settings,
  Inbox,
  Search,
  GripVertical,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const sharedPages = [
    {
      to: "/",
      label: "HR Tasks Hub",
      matchPaths: ["/", "/list", "/kanban"], // only these paths activate HR
    },
    { to: "/windah", label: "Windah Comp", matchPaths: ["/windah"] },
    { to: "/nospace", label: "NoSpace Dev", matchPaths: ["/nospace"] },
  ];

  const isPathActive = (matchPaths: string[]) =>
    matchPaths.some(
      (p) => location.pathname === p || location.pathname.startsWith(p + "/")
    );

  return (
    <aside className="w-64 border-r bg-white dark:bg-neutral-900 dark:border-neutral-800 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">
              Klaboard
            </span>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-600 inline-block mr-1"></span>
              <span className="font-semibold text-xs text-violet-600">
                free-trial
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
          <Search size={16} /> <span>Search</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
          <Home size={16} /> <span>Kla AI</span>
        </div>
        <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
          <div className="flex items-center gap-2">
            <Inbox size={16} /> <span>Inbox</span>
          </div>
          <Badge className="bg-purple-500 text-white text-xs">New</Badge>
        </div>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
              isActive
                ? "border-2 border-gray-200 dark:border-neutral-700 font-medium text-gray-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Calendar size={16} /> Calendar
        </NavLink>

        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
          <Settings size={16} /> <span>Settings & Preferences</span>
        </div>
      </nav>

      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Shared Pages
        </h4>
        <ul className="mt-2 space-y-1">
          {sharedPages.map((page) => (
            <li key={page.to}>
              <NavLink
                to={page.to}
                className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
                  isPathActive(page.matchPaths)
                    ? "border-2 border-gray-200 dark:border-neutral-700 font-medium text-gray-900 dark:text-white"
                    : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                <GripVertical size={16} /> {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Private Pages
        </h4>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
            <User size={16} /> Dribbble Portfolio
          </li>
        </ul>
      </div>

      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          Accounts
        </h4>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer">
            <img
              src="https://i.pravatar.cc/32?img=1"
              alt="User 1"
              className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
            />
            Teheran
          </li>
        </ul>
      </div>

      <div className="p-3 mt-auto">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Upgrade
        </Button>
      </div>
    </aside>
  );
}
