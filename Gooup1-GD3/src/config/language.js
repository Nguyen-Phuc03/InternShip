const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  cookie: 'lang',
  queryParameter: 'lang',
  register: global,
});

module.exports = i18n;
