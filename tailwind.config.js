/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		{
			pattern: /bg-(red|green|blue|yellow)-(500)/
		},
		{
			pattern: /text-(red|green|blue|yellow)-(500)/
		},
		{
			pattern: /border-(red|green|blue|yellow)-(500)/
		}
	],
	theme: {
		extend: {
			colors: {
				dark: '#1B1B1B'
			}
		}
	},
	plugins: []
};
