import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationKN from './locales/kn/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  kn: {
    translation: translationKN
  }
};

const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
document.documentElement.setAttribute('lang', savedLanguage);

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
