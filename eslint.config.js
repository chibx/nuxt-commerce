// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    tseslint.config(
        eslint.configs.recommended,
    )[0]?.rules
);
