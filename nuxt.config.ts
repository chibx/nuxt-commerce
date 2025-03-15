/* eslint-disable node/prefer-global/process */
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	i18n: { locales: ["en"], defaultLocale: "en" },
	srcDir: "./app",
	app: {
		head: {
			charset: "utf-8",
			meta: [
				{
					name: "theme-color",
					media: "(prefers-color-scheme: light)",
					content: "#0F3877",
				},
				{ name: "color-scheme", content: "light dark" },
				{
					name: "viewport",
					content: "viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
				},
				{ name: "format-detection", content: "telephone=no" },
				{ name: "msapplication-tap-highlight", content: "no" },
				{ name: "apple-mobile-web-app-capable", content: "yes" },
				{
					name: "apple-mobile-web-app-title",
					content: "nuxt-commerce",
				},
			],
			// link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
			title: "Nuxt-Commerce",
			base: { href: "/" },
		},
	},

	modules: [
		"@formkit/auto-animate/nuxt",
		"@nuxt/image",
		"@pinia/nuxt",
		"@nuxt/icon",
		"@nuxtjs/i18n",
		"@nuxt/test-utils/module",
		"@nuxtjs/sitemap",
		"@nuxtjs/color-mode",
		"@nuxtjs/seo",
		"nuxt-csurf",
	],

	css: ["~/assets/css/tailwind.css"],
	vue: { compilerOptions: { mode: "module" } },

	runtimeConfig: {
		mailerSendKey: process.env.NUXT_MAILER_SEND_KEY,
		databaseURL: process.env.NUXT_DATABASE_URL,
		redisUrl: process.env.NUXT_REDIS_URL,
		cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY,
		cloudinaryApiSecret: process.env.NUXT_CLOUDINARY_API_SECRET,
		privateSessionKey: process.env.NUXT_PRIVATE_SESSION_KEY,
		secretKey: process.env.NUXT_SECRET_KEY,
		public: {
			cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
		},
	},

	nitro: {
		serverAssets: [{ baseName: "email", dir: "./email" }],
		experimental: { tasks: true, websocket: true },
		esbuild: { options: { target: "node18" } },
		routeRules: {
			// '/api/**': {
			//   cors: true,
			//   headers: {
			//     'Access-Control-Allow-Origin': '*', // Allow any origin, or specify a specific origin
			//     'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
			//     'Access-Control-Allow-Headers': 'Content-Type,Authorization',
			//     'Access-Control-Allow-Credentials': 'true',
			//     'Access-Control-Max-Age': '7200', // Cache preflight response for 2 hours
			//   },
			// },
		},
	},

	vite: {
		plugins: [tailwindcss(), svgLoader({ svgo: false })],
		esbuild: { target: "es2020" },
	},

	compatibilityDate: "2025-03-14",
});
