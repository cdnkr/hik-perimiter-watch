module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Roboto', 'sans-serif'],
            serif: ['"Roboto Slab"', 'serif'],
            body: ['Roboto', 'sans-serif'],
        },
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            purple: "#d2e9eb",
            blue: "#11b5b4"
        }
    },
    variants: {
        extend: {},
    }
};
