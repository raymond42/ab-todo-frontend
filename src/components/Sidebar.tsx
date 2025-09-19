import {
  Home,
  Calendar,
  Settings,
  Inbox,
  Search,
  Folder,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex flex-col">
            <span className="font-semibold">Klaboard</span>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-violet-600 inline-block mr-1 justify-center"></span>
              <span className="font-semibold text-xs text-violet-600">
                free-trial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <Search size={16} /> <span>Search</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <Home size={16} /> <span>Kla AI</span>
        </div>
        <div className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-2">
            <Inbox size={16} /> <span>Inbox</span>
          </div>
          <Badge className="bg-purple-500 text-white text-xs">New</Badge>
        </div>

        {/* Route links */}
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-2 rounded-md ${
              isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`
          }
        >
          <Calendar size={16} /> Calendar
        </NavLink>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <Settings size={16} /> <span>Settings & Preferences</span>
        </div>
      </nav>

      {/* Shared Pages */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 uppercase">
          Shared Pages
        </h4>
        <ul className="mt-2 space-y-1">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-2 rounded-md ${
                  isActive ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
                }`
              }
            >
              <Folder size={16} /> HR Tasks Hub
            </NavLink>
          </li>
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <Folder size={16} /> Windah Comp
          </li>
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <Folder size={16} /> NoSpace Dev
          </li>
        </ul>
      </div>

      {/* Private Pages */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 uppercase">
          Private Pages
        </h4>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <User size={16} /> Dribbble Portfolio
          </li>
        </ul>
      </div>

      {/* Accounts */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 uppercase">
          Accounts
        </h4>
        <ul className="mt-2 space-y-1">
          <li className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-gray-400" />
            Teheran
          </li>
        </ul>
      </div>

      {/* Upgrade CTA */}
      <div className="p-3 mt-auto">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Upgrade
        </Button>
      </div>
    </aside>
  );
}
