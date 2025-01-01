import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
function createEslintConfig() {
  const settings = {
    react: {
      version: 'detect',
    },
  };

  const overridedRules = {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  };

  return [
    {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
    {languageOptions: {globals: globals.browser}},
    {
      settings,
    },
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {rules: overridedRules},
  ];
}

const eslintConfig = createEslintConfig();

export default eslintConfig;
