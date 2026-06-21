import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import locale files
import commonEn from '@/public/locales/en/common.json';
import authEn from '@/public/locales/en/auth.json';
import menuEn from '@/public/locales/en/menu.json';
import cartEn from '@/public/locales/en/cart.json';
import orderEn from '@/public/locales/en/order.json';
import profileEn from '@/public/locales/en/profile.json';

import commonHi from '@/public/locales/hi/common.json';
import authHi from '@/public/locales/hi/auth.json';
import menuHi from '@/public/locales/hi/menu.json';
import cartHi from '@/public/locales/hi/cart.json';
import orderHi from '@/public/locales/hi/order.json';
import profileHi from '@/public/locales/hi/profile.json';

const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    menu: menuEn,
    cart: cartEn,
    order: orderEn,
    profile: profileEn,
  },
  hi: {
    common: commonHi,
    auth: authHi,
    menu: menuHi,
    cart: cartHi,
    order: orderHi,
    profile: profileHi,
  },
};

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      ns: ['common', 'auth', 'menu', 'cart', 'order', 'profile'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
    });
}

export default i18next;
