import Cookies from 'js-cookie';
import i18n from 'i18n';

// Antd 国际化方案
import zh from 'antd/es/locale/zh_CN';
import en from 'antd/es/locale/en_US';
import ja from 'antd/es/locale/ja_JP';
import ko from 'antd/es/locale/ko_KR';

const locale = i18n.language || 'zh-CN';

const antdLocaleConfigs = {
  'zh-CN': zh,
  'en-US': en,
  ja,
  ko,
};

export default antdLocaleConfigs[locale];
