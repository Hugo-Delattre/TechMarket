/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.nvidia.com', 'encrypted-tbn0.gstatic.com', 'picsum.photos', 'example.com', 'picsum.photos', 'media.ldlc.com', 'thispersondoesnotexist.com', 'loremflickr.com'],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;
