module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    mode: 'all',
    content: ['./**/**/*.html', './**/**/*.svelte'],

    // options: {
    //   whitelistPatterns: [/svelte-/],
    //   defaultExtractor: (content) =>
    //     [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
    // },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    flex: {
      1: '1 1 0%',
      2: '2 2 0%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
