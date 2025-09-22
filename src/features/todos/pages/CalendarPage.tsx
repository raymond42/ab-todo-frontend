import { useTranslation } from "react-i18next";

export default function CalendarPage() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="text-center space-y-6 p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
        <div className="text-6xl">📅</div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {t("comingSoon")}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          {t("calendarComingSoonMessage")}
        </p>
      </div>
    </div>
  );
}
