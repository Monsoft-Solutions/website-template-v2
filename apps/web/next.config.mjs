/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@workspace/ui', '@workspace/db'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
            },
        ],
    },
}

export default nextConfig
