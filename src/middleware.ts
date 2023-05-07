import { withClerkMiddleware } from '@clerk/nextjs/server';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default withClerkMiddleware((req: NextRequest, res: NextFetchEvent) => {
	console.log('Clerk middleware running');
	return NextResponse.next();
});

export const config = {
	api: {
		bodyParser: false,
	},
	// Match all routes except for static files
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: '/api/:path*',
			},
			{
				source: '/:path*',
				destination: '/:path*',
			},
		];
	},
};
