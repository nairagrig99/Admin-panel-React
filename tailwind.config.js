/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Make sure this covers your folder structure!
    ],
    theme: {
        extend: {
            colors:{
                'primary-teal': '#2D7A78'
            }
        },
    },
    plugins: [],
}