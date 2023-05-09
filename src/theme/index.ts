// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			// Global styles go here
			body: {
				fontFamily: 'Arial, sans-serif',
				fontWeight: '400',
				lineHeight: '1.5',
				backgroundColor: '#f5f5f5',
				color: '#333',
			},
		},
	},
	// Custom configurations go here
	colors: {
		brand: {
			100: '#f7fafc',
			900: '#1a202c',
		},
	},
	components: {
		Button: {
			// Custom button styles go here
			baseStyle: {
				fontWeight: 'bold',
			},
			variants: {
				// Custom button variants go here
			},
		},
		// Other component customizations go here
	},
});

export default theme;
