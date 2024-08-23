const { resolve } = require('path');

module.exports = {
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
    // parse: '@typescript-eslint/parser',
    // project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['custom-service-worker.ts'],

      env: {
        serviceworker: true,
      },
    },
  ],
};
