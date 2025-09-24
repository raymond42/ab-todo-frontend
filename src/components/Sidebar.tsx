import {
  Home,
  Calendar,
  Settings,
  Inbox,
  Search,
  GripVertical,
  ChevronDown,
  PlusIcon,
  Ellipsis,
  Sun,
  Sparkles,
  Mail,
  CalendarMinus2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import HrTaskHubIcon from "@/assets/hrtaskhub.svg";
import WindahCompIcon from "@/assets/windahcomp.svg";
import NoSpaceDev from "@/assets/nospacedev.svg";
import DribbbleIcon from "@/assets/dribble.svg";
import NavItem from "./NavItem";

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
      to: "/#",
      label: t("windahComp"),
      matchPaths: ["/windah"],
      icon: <img src={WindahCompIcon} alt="Windah Comp" className="w-6 h-6" />,
    },
    {
      to: "/#",
      label: t("noSpaceDev"),
      matchPaths: ["/nospace"],
      icon: <img src={NoSpaceDev} alt="NoSpace Dev" className="w-6 h-6" />,
    },
  ];

  return (
    <aside
      aria-label="Sidebar navigation"
      className="flex flex-col w-64 border-r bg-white dark:bg-neutral-900 dark:border-neutral-800 h-screen overflow-y-auto scrollbar-hover"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">
              <Sun size={24} />
            </span>
          </div>{" "}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-white">
              {t("klaboard")}
            </span>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 inline-block mr-1" />
              <span className="font-semibold text-xs text-violet-600">
                {t("freeTrial")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-2 text-sm">
        <NavItem icon={<Search size={16} />} label={t("search")} />
        <NavItem icon={<Sparkles size={16} />} label={t("klaAi")} />
        <NavItem
          icon={<Mail size={16} />}
          label={t("inbox")}
          badge={t("new")}
        />
        <NavItem
          to="/calendar"
          icon={<CalendarMinus2 size={16} />}
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
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>{t("sharedPages")}</span>
            <ChevronDown
              size={18}
              strokeWidth={2.6}
              className="text-gray-400"
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <ul className="pt-2 space-y-1">
              {sharedPages.map((page) => (
                <li key={page.to}>
                  <NavItem
                    to={page.to}
                    icon={
                      <div className="flex items-center gap-2">
                        <GripVertical size={14} className="text-gray-400" />
                        {page.icon}
                      </div>
                    }
                    label={page.label}
                    matchPaths={page.matchPaths}
                  />
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Private Pages */}
      <div className="px-3 py-2">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            <span>{t("privatePages")}</span>
            <ChevronDown
              size={18}
              strokeWidth={2.6}
              className="text-gray-400"
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="pt-2">
              <NavItem
                icon={
                  <div className="flex items-center gap-1">
                    <GripVertical size={14} className="text-gray-400" />
                    {/* {page.icon} */}
                    <img
                      src={DribbbleIcon}
                      alt="Dribbble Portfolio"
                      className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900"
                    />
                  </div>
                }
                label={t("dribbblePortfolio")}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Accounts */}
      <div className="px-3 py-2">
        <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span>{t("accounts")}</span>
          <PlusIcon className="inline h-5 w-5 text-gray-400" />
        </h4>
        <span className="pt-2 flex justify-between items-center">
          <NavItem
            isProfile
            icon={
              <img
                src="https://i.pravatar.cc/32?img=1"
                alt="User 1"
                className="w-8 h-8 rounded-lg border-2 border-white dark:border-neutral-900 font-extrabold"
              />
            }
            label={t("teheran")}
          />
          <Ellipsis size={20} className="cursor-pointer" />
        </span>
      </div>

      {/* Upgrade Card */}
      <div className="p-2">
        <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow border dark:border-neutral-800">
          <div className="h-28 w-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 relative">
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">
                  <Sun size={18} />
                </span>
              </div>
            </div>
          </div>

          <div className="pt-10 pb-5 px-4 text-center space-y-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white leading-snug">
              Maximize your <br /> productivity
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Boost your task management <br /> with advanced tools &amp;
              features.
            </p>
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-b from-gray-700 to-gray-900 
                   text-white text-sm font-medium shadow-inner hover:opacity-90 transition"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
