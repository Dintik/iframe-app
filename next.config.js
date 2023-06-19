/** @type {import('next').NextConfig} */

const withOptimizedImages = require('next-optimized-images')

const nextConfig =
    withOptimizedImages({
        handleImages: ['jpeg', 'png', 'svg', 'webp'],
        reactStrictMode: true,
        images: {
            disableStaticImages: true,
        },
        swcMinify: false
    })

module.exports = nextConfig
