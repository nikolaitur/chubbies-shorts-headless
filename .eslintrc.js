/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  extends: ['plugin:hydrogen/recommended', 'plugin:hydrogen/typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    'react/no-array-index-key': 'off',
    'eslint-comments/no-unlimited-disable': 'off', // this is for codegen
    'eslint-comments/disable-enable-pair': 'off', // this is for codegen
  },
}
