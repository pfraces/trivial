import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest'
      }
    },
    plugins: {
      import: importPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: 'jsconfig.json'
        }
      },
      'import/parsers': {
        espree: ['.js', '.jsx']
      }
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'no-console': 'error',
      curly: 'error',
      'import/extensions': ['error', 'ignorePackages']
    }
  },
  {
    files: ['**/*.js'],
    ignores: ['src/**'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: true,
          rootDir: 'src',
          prefix: '@'
        }
      ]
    }
  },
  {
    files: ['**/*.jsx'],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    settings: { react: { version: 'detect' } },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off'
    }
  }
];
