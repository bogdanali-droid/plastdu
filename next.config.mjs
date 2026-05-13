/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["leaflet", "react-leaflet", "leaflet.markercluster"],

  images: {
    unoptimized: true,
  },

  poweredByHeader: false,
};

export default nextConfig;
