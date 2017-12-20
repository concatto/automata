// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'semi': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'quotes': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'prefer-const': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
