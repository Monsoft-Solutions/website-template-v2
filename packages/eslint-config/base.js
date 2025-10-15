import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
        },
        rules: {
            'turbo/no-undeclared-env-vars': 'warn',
            'no-restricted-properties': [
                'error',
                {
                    object: 'process',
                    property: 'env',
                    message:
                        'Use env module instead (e.g., import { env } from "apps/web/env" or "packages/db/src/env")',
                },
            ],
        },
    },
    {
        plugins: {
            onlyWarn,
        },
    },
    {
        ignores: ['dist/**'],
    },
    {
        rules: {
            // Allow env access in dedicated env modules
            'no-restricted-properties': 'off',
        },
        files: ['**/*/env.ts', '**/*/env.mjs', '**/*/env.cjs'],
    },
    {
        files: ['packages/seo/**'],
        rules: {
            // Temporarily allow process.env in SEO package until migrated
            'no-restricted-properties': 'off',
        },
    },
]
