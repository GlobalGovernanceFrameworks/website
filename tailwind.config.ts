import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'cosmic-dark': '#2B4B8C',
				'cosmic-light': '#6B5CA5',
				'earthy-dark': '#2D5F2D',
				'earthy-light': '#7D9F7D',
				'gold-dark': '#B8860B',
				'gold-light': '#DAA520',
				'root-dark': '#654321',
				'root-light': '#8B7355'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
