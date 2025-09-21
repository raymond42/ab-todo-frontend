import * as React from "react";

export const useTranslation = () => {
  return {
    t: (key: string) => {
      const map: Record<string, string> = {
        // Navbar
        sharedPages: "Shared Pages",
        hrHub: "HR Tasks Hub",
        welcomeMessage: "Welcome to the Human Resources hub",
        kanban: "Kanban",
        list: "List",
        calendar: "Calendar",
        searchPlaceholder: "Search here",
        filter: "Filter",
        sort: "Sort",
        share: "Share",

        // Sidebar
        klaboard: "Klaboard",
        freeTrial: "Free Trial",
        search: "Search",
        klaAi: "Kla AI",
        inbox: "Inbox",
        new: "New",
        settingsPreferences: "Settings & Preferences",
        hrTasksHub: "HR Tasks Hub",
        windahComp: "Windah Comp",
        noSpaceDev: "NoSpace Dev",
        privatePages: "Private Pages",
        dribbblePortfolio: "Dribbble Portfolio",
        accounts: "Accounts",
        teheran: "Teheran",
        upgrade: "Upgrade",
      };
      return map[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  };
};

export const Trans = ({ children }: { children: React.ReactNode }) => children;
