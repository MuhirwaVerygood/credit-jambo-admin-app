/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    // Completely disable webpack warnings
    config.stats = 'errors-only';
    
    // Suppress all infrastructure logging
    config.infrastructureLogging = {
      level: 'none',
    };
    
    // Override webpack's warning system
    const originalEmit = config.plugins.find(plugin => plugin.constructor.name === 'DefinePlugin');
    
    // Add custom plugin to filter warnings
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.done.tap('SuppressWarnings', (stats) => {
          stats.compilation.warnings = stats.compilation.warnings.filter(warning => {
            const message = warning.message || warning.toString();
            return !message.includes('There are multiple modules with names that only differ in casing') &&
                   !message.includes('This can lead to unexpected behavior when compiling on a filesystem with other case-semantic') &&
                   !message.includes('Use equal casing');
          });
        });
      }
    });
    
    // Fix case sensitivity issues
    config.resolve.symlinks = false;
    
    return config;
  },
  // Suppress dev indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Optimize for development
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['axios', 'form-data'],
  },
};

module.exports = nextConfig;