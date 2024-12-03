const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // port: '',
                // pathname: '/image/upload/**', // Correct path
            },
        ],
    },
};

module.exports = nextConfig;
