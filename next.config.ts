import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Set the correct workspace root to avoid lockfile detection issues
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { isServer }) => {
    // Set the context to the current directory to avoid resolving parent directories
    config.context = __dirname;
    // Prevent webpack from resolving modules in parent directories
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ];
    // Prevent webpack from looking for package.json in parent directories
    config.resolve.roots = [path.resolve(__dirname)];
    // Ignore parent directories when resolving
    config.resolve.symlinks = false;
    // Add a plugin to ignore parent package.json files
    const originalResolveLoader = config.resolveLoader;
    config.resolveLoader = {
      ...originalResolveLoader,
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
      ],
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "treestone.com",
      },
      {
        protocol: "https",
        hostname: "ujhdxmtcusbewkfaweeg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
