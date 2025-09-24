//Sidebar.tsx
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
import { useTranslation } from "react-i18next";
import HrTaskHubIcon from "@/assets/hrtaskhub.svg";
import WindahCompIcon from "@/assets/windahcomp.svg";
import NoSpaceDev from "@/assets/nospacedev.svg";

function NavItem({
  to,
  icon,
  label,
  matchPaths = [],
  badge,
}: {
  to?: string;
  icon: React.ReactNode;
  label: string;
  matchPaths?: string[];
  badge?: string;
}) {
  const location = useLocation();

  const isActive = matchPaths.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + "/")
  );

  const baseClasses =
    "flex items-center gap-2 px-2 py-2 rounded-md transition-colors";
  const activeClasses =
    "border-2 border-gray-200 dark:border-neutral-700 font-medium text-gray-900 dark:text-white";
  const inactiveClasses =
    "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300";

  if (to) {
    return (
      <NavLink
        to={to}
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        {icon}
        <span>{label}</span>
        {badge && (
          <Badge className="ml-auto bg-purple-500 text-white text-xs">
            {badge}
          </Badge>
        )}
      </NavLink>
    );
  }

  return (
    <div className={`${baseClasses} ${inactiveClasses} cursor-pointer`}>
      {icon}
      <span>{label}</span>
      {badge && (
        <Badge className="ml-auto bg-purple-500 text-white text-xs">
          {badge}
        </Badge>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { t } = useTranslation();

  const sharedPages = [
    {
      to: "/",
      label: t("hrTasksHub"),
      matchPaths: ["/", "/list", "/kanban"],
      icon: <img src={HrTaskHubIcon} alt="HR Tasks Hub" className="w-6 h-6" />,
    },
    {
      to: "/windah",
      label: t("windahComp"),
      matchPaths: ["/windah"],
      icon: <img src={WindahCompIcon} alt="Windah Comp" className="w-6 h-6" />,
    },
    {
      to: "/nospace",
      label: t("noSpaceDev"),
      matchPaths: ["/nospace"],
      icon: <img src={NoSpaceDev} alt="NoSpace Dev" className="w-6 h-6" />,
    },
  ];

  return (
    <aside className="flex flex-col w-64 border-r bg-white dark:bg-neutral-900 dark:border-neutral-800 h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">
              {t("klaboard")}
            </span>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block mr-1"></span>
              <span className="font-semibold text-xs text-violet-600">
                {t("freeTrial")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-2 text-sm overflow-auto">
        <NavItem icon={<Search size={16} />} label={t("search")} />
        <NavItem icon={<Home size={16} />} label={t("klaAi")} />
        <NavItem
          icon={<Inbox size={16} />}
          label={t("inbox")}
          badge={t("new")}
        />
        <NavItem
          to="/calendar"
          icon={<Calendar size={16} />}
          label={t("calendar")}
          matchPaths={["/calendar"]}
        />
        <NavItem
          icon={<Settings size={16} />}
          label={t("settingsPreferences")}
        />
      </nav>

      {/* Shared Pages */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          {t("sharedPages")}
        </h4>
        <ul className="mt-2 space-y-1">
          {sharedPages.map((page) => (
            <li key={page.to}>
              <NavItem
                to={page.to}
                icon={
                  <>
                    <GripVertical size={14} className="ml-1 text-gray-400" />
                    {page.icon}
                  </>
                }
                label={page.label}
                matchPaths={page.matchPaths}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Private Pages */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          {t("privatePages")}
        </h4>
        <NavItem icon={<User size={16} />} label={t("dribbblePortfolio")} />
      </div>

      {/* Accounts */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
          {t("accounts")}
        </h4>
        <NavItem
          icon={
            <img
              src="https://i.pravatar.cc/32?img=1"
              alt="User 1"
              className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
            />
          }
          label={t("teheran")}
        />
      </div>

      {/* Upgrade Button */}
      <div className="p-3 mt-auto">
        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          {t("upgrade")}
        </Button>
      </div>
    </aside>
  );
}
