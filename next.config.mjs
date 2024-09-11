/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  env: {
    BASE_URL: 'https://api-backend-school-system.dsmeglobal.com/',
    // BASE_URL: 'https://back-men.vitrika.digital.gov.mg/',
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
