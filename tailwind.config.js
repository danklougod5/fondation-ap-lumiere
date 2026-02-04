/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066CC', // Bleu principal
                    dark: '#003366',    // Bleu foncé
                },
                accent: {
                    DEFAULT: '#00C896', // Vert d'accent
                    light: '#E0F7F1',   // Vert clair
                }
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
