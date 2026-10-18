import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: { sourceType: 'module', ecmaVersion: 2022 },
			globals: { ...globals.browser, ...globals.node, ...globals.es2022 }
		},
		plugins: { '@typescript-eslint': tsPlugin },
		rules: { ...tsPlugin.configs.recommended.rules, 'no-undef': 'off' }
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: { parser: tsParser, extraFileExtensions: ['.svelte'] },
			globals: {
				...globals.browser,
				...globals.es2022,
				$state: 'readonly',
				$derived: 'readonly',
				$props: 'readonly'
			}
		},
		processor: sveltePlugin.processors['.svelte'],
		plugins: { svelte: sveltePlugin },
		rules: { ...sveltePlugin.configs.recommended.rules, 'no-undef': 'off' }
	},
	prettierConfig,
	{
		ignores: [
			'.vercel/**',
			'.svelte-kit/**',
			'build/**',
			'node_modules/**',
			'legacy-static/**',
			'api/**',
			'js/**',
			'server.js',
			'run.mjs'
		]
	}
];
