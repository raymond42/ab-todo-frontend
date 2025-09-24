import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-md transform transition-transform duration-300 ${
          currentTheme === "dark" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {currentTheme === "dark" ? (
          <Moon className="h-4 w-4 text-gray-700" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
