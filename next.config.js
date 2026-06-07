/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self';";

const securityHeaders = [
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ key: 'X-DNS-Prefetch-Control', value: 'off' },
	{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
	{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
	{ key: 'Content-Security-Policy', value: ContentSecurityPolicy },
];

const nextConfig = {
	async headers() {
		return [
			{
				// Apply these headers to all routes in the application.
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;