import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import {
  Star,
  Share2,
  SlidersHorizontal,
  List,
  LayoutGrid,
  Calendar,
  ChevronRight,
  Ellipsis,
  Menu,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type NavItem = { to: string; label: string; icon: React.ReactNode };

const navItems: NavItem[] = [
  { to: "/", label: "kanban", icon: <LayoutGrid size={16} /> },
  { to: "/list", label: "list", icon: <List size={16} /> },
  { to: "/calendar", label: "calendar", icon: <Calendar size={16} /> },
];

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { i18n, t } = useTranslation();

  return (
    <header className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-6 py-3 border-b bg-white dark:bg-neutral-900 dark:border-neutral-800 gap-2">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          onClick={onMenuClick}
        >
          <Menu />
        </button>

        <div className="min-w-0">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">
            <span>{t("sharedPages")}</span>
            <ChevronRight size={14} className="mx-1" />
            <span className="font-medium text-gray-700 dark:text-gray-200 truncate">
              {t("hrHub")}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {t("hrHub")} 🧑‍💼
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {t("welcomeMessage")}
          </p>

          {/* Desktop nav items */}
          <nav className="hidden md:flex gap-2 mt-2 flex-wrap">
            <span className="w-10 h-10 border-2 rounded-lg flex items-center justify-center">
              <Ellipsis size={20} />
            </span>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors border-2 ${
                    isActive
                      ? "dark:bg-neutral-700 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300 font-light"
                  }`
                }
              >
                {item.icon} {t(item.label)}
              </NavLink>
            ))}
          </nav>

          {/* Mobile nav items */}
          <nav className="flex md:hidden gap-2 mt-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors border-2 ${
                    isActive
                      ? "dark:bg-neutral-700 font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300 font-light"
                  }`
                }
              >
                {item.icon} {t(item.label)}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <Input
          placeholder={t("searchPlaceholder")}
          className="w-full sm:w-56 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
        />
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="mr-1 h-4 w-4" /> {t("filter")}
        </Button>
        <Button variant="outline" size="sm">
          {t("sort")}
        </Button>
        <Button variant="ghost" size="sm">
          <Star />
        </Button>

        <div className="flex -space-x-4">
          <img
            src="https://i.pravatar.cc/32?img=1"
            alt="User 1"
            className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
          />
          <img
            src="https://i.pravatar.cc/32?img=2"
            alt="User 2"
            className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
          />
          <img
            src="https://i.pravatar.cc/32?img=3"
            alt="User 3"
            className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
          />
        </div>

        <Button variant="outline" size="sm">
          <Share2 className="mr-1 h-4 w-4" /> {t("share")}
        </Button>

        {/* Language Switch */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => i18n.changeLanguage("en")}
          >
            🇬🇧 EN
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => i18n.changeLanguage("fr")}
          >
            🇫🇷 FR
          </Button>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
}
