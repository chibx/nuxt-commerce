import { type Config } from "tailwindcss";
export default <Config>{
    content: ["./components/**/*.vue", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue"],
    theme: {
        extend: {
            colors: {
                pb: {
                    "50": "#ecf9ff",
                    "100": "#d5f0ff",
                    "200": "#b4e6ff",
                    "300": "#80d9ff",
                    "400": "#44c1ff",
                    "500": "#19a0ff",
                    "600": "#0180ff",
                    "700": "#0067fa",
                    "800": "#0452c9",
                    "900": "#0a499e",
                    "950": "#0f3877",
                },
            },
            fontSize: {
                "16": ["16px", "1px"],
            },
        },
    },
    plugins: [],
};
