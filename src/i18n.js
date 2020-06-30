/**
 * 国际化方案配置
 *
 * @author Wang Qinhong
 * @copyright XUST KCSoft
 */

import Cookies from 'js-cookie';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './common/locales/en-Us.json';
import zhCN from './common/locales/zh-CN.json';
import ja from './common/locales/ja.json';
import ko from './common/locales/ko.json';

const detectorOptions = {
  order: ['cookie', 'querystring', 'navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
  lookupQuerystring: 'lng',
  lookupCookie: 'locale',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  htmlTag: document.documentElement,
  checkWhitelist: true,
  cookieOptions: { path: '/' },
};

i18n
  .use(LanguageDetector) // 自动嗅探当前浏览器语言
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false,
    },
    keySeparator: false,
    // lng: locale,
    fallbackLng: 'zh-CN',
    resources: {
      'en-US': {
        translation: enUS,
      },
      'zh-CN': {
        translation: zhCN,
      },
      ja: {
        translation: ja,
      },
      ko: {
        translation: ko,
      },
    },
    detection: detectorOptions,
  });

export default i18n;
