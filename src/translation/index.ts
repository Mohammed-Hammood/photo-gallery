import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from './locales/english.json'
import Russian from './locales/russian.json'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: English,
    ru: Russian,
}

i18n
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;