import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'i.pravatar.cc',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'place-hold.it',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
      pathname: '/**',
    },
  ],
},
};

export default nextConfig;
