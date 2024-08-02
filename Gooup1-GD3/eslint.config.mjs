import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Giữ lại nếu bạn cũng cần các biến toàn cục của trình duyệt
        ...globals.node,
        ...globals.jest, // Thêm dòng này để bổ sung các biến toàn cục của Node.js
        io: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
];
