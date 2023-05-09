import { type AppType } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import theme from 'src/theme'; // Import your theme
import { api } from 'src/utils/api';

import 'src/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ClerkProvider {...pageProps}>
				<ChakraProvider theme={theme}>
					{' '}
					{/* Add ChakraProvider and pass the custom theme */}
					<Head>
						<title>Author-Awesome-App</title>
						<meta name='description' content='💭' />
						<link rel='icon' href='/favicon.ico' />
					</Head>
					<Toaster position='bottom-center' />
					<Component {...pageProps} />
				</ChakraProvider>{' '}
				{/* Close ChakraProvider */}
			</ClerkProvider>
		</QueryClientProvider>
	);
};

export default api.withTRPC(MyApp);
