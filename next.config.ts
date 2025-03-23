import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	devIndicators: false,
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: '/sounds/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/fonts/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

export default nextConfig;
