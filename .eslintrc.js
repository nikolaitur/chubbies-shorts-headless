/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  extends: ['plugin:hydrogen/recommended', 'plugin:hydrogen/typescript', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
}
