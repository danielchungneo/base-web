module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: "/demo/:slug",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
