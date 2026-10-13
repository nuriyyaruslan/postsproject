import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const loadTranslations = async (language) => {
  const response = await fetch(
    `/locales/${language}/translation.json`
  );

  return response.json();
};

const initI18n = async () => {
  const az = await loadTranslations("az");
  const en = await loadTranslations("en");

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        az: {
          translation: az,
        },
        en: {
          translation: en,
        },
      },

      lng: "az",

      fallbackLng: "en",

      interpolation: {
        escapeValue: false,
      },
    });
};

export default initI18n;