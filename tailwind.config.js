/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // You can add your WealthWatch brand colors here later!
            fontFamily: {
                sans: ['ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
}