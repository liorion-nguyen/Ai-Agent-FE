/** @type {import('next').NextConfig} */

let hasLogged = false;
class LogPlugin {
  apply(_) {
    if (!hasLogged && process.env.NEXT_NODE_ENV === 'development') {
      console.log(`🚀  Local User domain: ${process.env.NEXT_PUBLIC_URL}`);
      console.log(
        `🚀  Local Admin domain: ${process.env.NEXT_PUBLIC_ADMIN_URL}`,
      );
      hasLogged = true;
    }
  }
}

const nextConfig = {
  output: 'standalone',
  compiler:
    process.env.NODE_ENV === 'production'
      ? {
          removeConsole: { exclude: ['error'] },
          styledComponents: true,
        }
      : {},
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(new LogPlugin());
    return config;
  },
};

export default nextConfig;
