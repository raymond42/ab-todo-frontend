// import * as React from "react";

// export const useTranslation = () => {
//   return {
//     t: (key: string) => {
//       const map: Record<string, string> = {
//         // Sidebar
//         klaboard: "Klaboard",
//         freeTrial: "Free Trial",
//         search: "Search",
//         klaAi: "Kla AI",
//         inbox: "Inbox",
//         new: "New",
//         settingsPreferences: "Settings & Preferences",
//         hrTasksHub: "HR Tasks Hub",
//         windahComp: "Windah Comp",
//         noSpaceDev: "NoSpace Dev",
//         privatePages: "Private Pages",
//         dribbblePortfolio: "Dribbble Portfolio",
//         accounts: "Accounts",
//         teheran: "Teheran",
//         upgrade: "Upgrade",
//         sharedPages: "Shared Pages",
//         todoLabel: "To-Do",
//         inProgressLabel: "In Progress",
//         needsReviewLabel: "Needs Review",
//         doneLabel: "Done",
//         calendarComingSoonMessage:
//           "We are working hard to bring you the calendar view. Stay tuned!",
//         comingSoon: "Coming Soon",

//         // Navbar
//         hrHub: "HR Tasks Hub",
//         welcomeMessage: "Welcome to the Human Resources hub",
//         kanban: "Kanban",
//         list: "List",
//         calendar: "Calendar",
//         searchPlaceholder: "Search here",
//         filter: "Filter",
//         sort: "Sort",
//         share: "Share",
//       };
//       return map[key] || key;
//     },
//     i18n: {
//       changeLanguage: jest.fn(),
//       language: "en",
//     },
//   };
// };

// export const Trans = ({ children }: { children: React.ReactNode }) => children;

import * as React from "react";

export const useTranslation = () => {
  return {
    t: (key: string) => {
      const map: Record<string, string> = {
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
        sharedPages: "Shared Pages",

        // Navbar
        hrHub: "HR Tasks Hub",
        welcomeMessage: "Welcome to the Human Resources hub",
        kanban: "Kanban",
        list: "List",
        calendar: "Calendar",
        searchPlaceholder: "Search here",
        filter: "Filter",
        sort: "Sort",
        share: "Share",

        // Kanban Board - Add these for your tests
        todoLabel: "To-do",
        inProgressLabel: "In Progress",
        needsReviewLabel: "Needs Review",
        doneLabel: "Done",
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
