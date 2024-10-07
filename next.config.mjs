/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {hostname: "img.clerk.com"}
        ]
    }
};

export default nextConfig;
