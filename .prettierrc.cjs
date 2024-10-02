module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'lf',
  importOrder: [
    '^react(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./](?!.*module\\.sass$)',
    '^.*module\\.sass$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
