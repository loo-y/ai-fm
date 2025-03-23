import type { Config } from 'tailwindcss';

const config = {
	content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
	prefix: '',
	theme: {},
	plugins: [
		require('tailwindcss-animate'),
		function ({ addUtilities }: { addUtilities: (params: Record<string, any>) => void }) {
			addUtilities({
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			});
		},
	],
} satisfies Config;

export default config;
