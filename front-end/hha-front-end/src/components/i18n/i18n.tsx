import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'fr'],
        fallbackLng: 'en',
        detection: {
            order: ['htmlTag', 'cookie', 'localStorage', 'path','subdomain'],
            caches: ['cookie'],
        },
        backend:{
            loadPath: './{{lng}}/translation.json'
        },
        react: {useSuspense: false},
        debug: true,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;