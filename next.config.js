/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  swcMinify: false, // Desactiva la minificación de SWC
  compiler: {
    // Desactiva SWC por completo
    swc: false,
  },
};

module.exports = nextConfig;
