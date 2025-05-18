// next.config.js
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.vkuserphoto.ru", // Основные изображения
            },
            {
                protocol: "https",
                hostname: "www.mirea.ru", // Заглушка
            },
        ],
    },
};

module.exports = nextConfig;