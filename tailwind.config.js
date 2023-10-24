/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],
    theme: {
        extend: {
            maxWidth: {
                quater: "25%",
                half: "50",
                most: "75%",
            },
            colors: {},
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
