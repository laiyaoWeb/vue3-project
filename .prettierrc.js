module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200
      }
    }
  ],
  arrowParens: 'always'
}
