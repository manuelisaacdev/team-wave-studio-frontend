import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FF204E",
                secondary: "#E3651D",
            },
            backgroundColor: {
                "paper-primary": "#040d12",
                "paper-secondary": "#030a0f",
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('tailwindcss-animated'),
    ],
} satisfies Config;
