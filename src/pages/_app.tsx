import { type AppType } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

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
				<Head>
					<title>Chirp</title>
					<meta name='description' content='💭' />
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<Toaster position='bottom-center' />
				<Component {...pageProps} />
			</ClerkProvider>
		</QueryClientProvider>
	);
};

export default api.withTRPC(MyApp);
