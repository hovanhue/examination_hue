/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withIntl = createNextIntlPlugin();
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["antd", "lodash"],
  compiler: {
    // removeConsole: false,
    // styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["antd"],
    serverActions: true,
  },
};

export default withIntl(nextConfig);
