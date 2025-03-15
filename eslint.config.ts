// @ts-check

import antfu from "@antfu/eslint-config";

export default antfu({
	stylistic: false,
	jsonc: false,
	rules: {
		"antfu/no-top-level-await": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/html-indent": "off",
	},
});
