module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    "react": {
      "version": "detect"
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', '@typescript-eslint',  'react-compiler',  'prettier'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    'react-compiler/react-compiler': 'error',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },

}
