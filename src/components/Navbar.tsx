import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import {
  Star,
  List,
  LayoutGrid,
  Calendar,
  ChevronRight,
  Ellipsis,
  Menu,
  PlusIcon,
  Earth,
  MessageCircleMore,
  FunnelIcon,
  ListFilter,
  ArrowDownWideNarrowIcon,
  MoreHorizontal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type NavItem = { to: string; label: string; icon: React.ReactNode };

const navItems: NavItem[] = [
  { to: "/", label: "kanban", icon: <LayoutGrid size={16} /> },
  { to: "/list", label: "list", icon: <List size={16} /> },
  { to: "/calendar", label: "calendar", icon: <Calendar size={16} /> },
];

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { i18n, t } = useTranslation();

  return (
    <header className="flex flex-col pt-3 w-full">
      {/* Top Row */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-b py-2.5 px-3">
        <div className="flex items-center gap-1 overflow-hidden">
          <PlusIcon size={14} className="w-5 h-5 shrink-0" />
          <div className="flex items-center pr-1">
            <span className="w-0.5 h-4 bg-gray-300 dark:bg-gray-700" />
          </div>
          <Earth size={14} className="w-6 h-6 text-gray-500 shrink-0" />
          <span className="truncate">{t("sharedPages")}</span>
          <ChevronRight size={20} className="mx-1 text-gray-700 shrink-0" />
          <span className="font-medium text-gray-700 dark:text-gray-200 truncate">
            {t("hrHub")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Buttons */}
          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="sm">
              <Star />
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircleMore />
            </Button>
            <Button variant="outline" size="sm">
              <FunnelIcon />
              {t("share")}
            </Button>
          </div>

          {/* Language + Mode Toggle */}
          <div className="hidden sm:flex gap-1">
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
            <ModeToggle />
          </div>

          {/* Mobile Ellipsis */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800">
                <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" /> {t("favorite")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircleMore className="mr-2 h-4 w-4" /> {t("message")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FunnelIcon className="mr-2 h-4 w-4" /> {t("share")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                🇬🇧 EN
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage("fr")}>
                🇫🇷 FR
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ModeToggle />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between border-b bg-white dark:bg-neutral-900 dark:border-neutral-800 gap-3 p-3">
        <div className="flex gap-3 w-full">
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={onMenuClick}
          >
            <Menu />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {t("hrHub")} 🗿
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
                    `flex items-center gap-1 px-2 py-1.5 rounded-md text-sm transition-colors border ${
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

        {/* Right-side Controls */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 items-end justify-end w-full md:h-full">
          <Input
            placeholder={t("searchPlaceholder")}
            className="w-full sm:w-56 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
          />
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 dark:text-gray-200 dark:bg-neutral-900"
          >
            <ListFilter className="mr-1 h-4 w-4" /> {t("filter")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 dark:text-gray-200 dark:bg-neutral-900"
          >
            <ArrowDownWideNarrowIcon className="mr-1 h-4 w-4" />
            {t("sort")}
          </Button>

          {/* Avatars */}
          <div className="flex -space-x-3">
            {[1, 2, 3].map((id) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/32?img=${id}`}
                alt={`User ${id}`}
                className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
