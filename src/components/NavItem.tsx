import { Flame } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

type NavItemProps = {
  to?: string;
  icon: React.ReactNode;
  label: string;
  matchPaths?: string[];
  badge?: string;
  isProfile?: boolean;
};

const NavItem = ({
  to,
  icon,
  label,
  matchPaths,
  badge,
  isProfile,
}: NavItemProps) => {
  const location = useLocation();

  const isActive = matchPaths?.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + "/")
  );

  const classes = clsx(
    "flex items-center gap-2 px-2 py-2 rounded-md transition-colors text-sm",
    isActive && !isProfile
      ? "border border-gray-200 dark:border-neutral-700 font-medium text-gray-800 dark:text-white"
      : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300 font-medium" +
          (isProfile ? " font-medium hover:bg-transparent px-0" : "")
  );

  const content = (
    <>
      {icon}
      <span>{label}</span>
      {badge && (
        <span className="ml-auto flex items-center text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full gap-1">
          <Flame size={14} />
          {badge}
        </span>
      )}
    </>
  );

  return to ? (
    <NavLink to={to} className={classes}>
      {content}
    </NavLink>
  ) : (
    <div className={clsx(classes, "cursor-pointer")}>{content}</div>
  );
};

export default NavItem;
