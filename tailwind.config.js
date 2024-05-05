/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                // one dark
                background: '#282c33',
                primary: '#62aeef',
                secondary: '#98c379',
                accent: '#f3f4f6',
                text: '#f3f4f6',
            }
        },
    },
    plugins: [],
}