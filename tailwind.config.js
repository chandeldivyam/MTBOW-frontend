/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        screens: {
            mobile: "512px",
            smobile: "300px",
        },
    },
    plugins: [],
    important: true,
};
