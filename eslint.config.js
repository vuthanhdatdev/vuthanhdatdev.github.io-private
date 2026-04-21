import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': tseslint
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      // React
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // TypeScript
      ...tseslint.configs.recommended.rules,

      // Match Prettier: no semicolons
      'semi': ['error', 'never'],
      // Match Prettier: no trailing commas
      'comma-dangle': ['error', 'never'],
      // Match Prettier: single quotes
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      // Match Prettier: LF line endings
      'linebreak-style': ['error', 'unix'],
      // Match tsconfig: noUnusedLocals / noUnusedParameters
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'all', ignoreRestSiblings: true, argsIgnorePattern: '^_' }
      ],
      // Match tsconfig: noImplicitReturns
      'consistent-return': 'error'
    }
  },

  {
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },

  {
    ignores: ['build/**', 'node_modules/**', 'vite.config.ts']
  }
]

