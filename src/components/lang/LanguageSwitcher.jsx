import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("az")}>
        AZ
      </button>

      <button onClick={() => changeLanguage("en")}>
        EN
      </button>

      <button onClick={() => changeLanguage("ru")}>
        RU
      </button>
    </div>
  );
}

export default LanguageSwitcher;