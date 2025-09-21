import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files directly
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;
