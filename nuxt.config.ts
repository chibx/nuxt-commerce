import svgLoader from "vite-svg-loader";
const sw = process.env.SW === "true";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        keepalive: {
            exclude: [],
        },
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
                { name: "apple-mobile-web-app-title", content: "nuxt-commerce" },
            ],
            // link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
            title: "Nuxt-Commerce",
            base: { href: "/" },
        },
    },
    modules: ["@pinia/nuxt", "@formkit/auto-animate/nuxt", "@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
    css: [
        // "~/assets/css/main.css",
        "primeicons/primeicons.css",
        "primevue/resources/themes/viva-light/theme.css",
    ],
    tailwindcss: {},
    vue: {
        compilerOptions: {
            prefixIdentifiers: true,
            mode: "module",
            comments: false,
        },
    },
    pwa: {
        registerWebManifestInRouteRules: false,
        manifest: {
            name: "Nuxt-Commerce",
            short_name: "nuxt-commerce",
            theme_color: "#ffffff",
            icons: [],
            display: "minimal-ui",
        },
        registerType: "autoUpdate",
        strategies: sw ? "injectManifest" : "generateSW",
        srcDir: sw ? "service-worker" : undefined,
        filename: sw ? "sw.ts" : undefined,
        client: {
            installPrompt: true,
        },
    },
    runtimeConfig: {},
    nitro: {
        serverAssets: [
            {
                baseName: "email",
                dir: "./email",
            },
        ],
        experimental: {
            tasks: true,
            websocket: true,
        },
        esbuild: {
            options: {
                target: "node18",
            },
        },
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
        replace: {
            "import.meta.db": JSON.stringify("PostgreSQL - Local"),
        },
    },
    vite: {
        plugins: [
            svgLoader({
                svgo: false,
            }),
        ],
        build: {
            cssMinify: "lightningcss",
        },
        esbuild: {
            target: "es2020",
        },
        ssr: {
            external: true,
        },
        css: {
            transformer: "lightningcss",
        },
        define: {
            "import.meta.db": JSON.stringify("PostgreSQL - Local"),
        },
    },
});
