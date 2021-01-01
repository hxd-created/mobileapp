import { registerRootComponent } from 'expo';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import localeEN from './locale/en';
import localeRU from './locale/ru';
import localeUK from './locale/uk';

i18n.translations = {
  "en": localeEN,
  "ru": localeRU,
  "uk": localeUK,
};
i18n.locale = "uk"; //Localization.locale;
// i18n.
i18n.fallbacks = "en";

import App from './src/App';


registerRootComponent(App);
