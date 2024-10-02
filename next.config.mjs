/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/djhlaeg41/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
