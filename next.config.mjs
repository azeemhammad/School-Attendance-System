/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  env: {
    BASE_URL: 'https://api-backend-school-system.dsmeglobal.com/',
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
