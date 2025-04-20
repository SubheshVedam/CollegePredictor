/** @type {import('next').NextConfig} */
const nextConfig = {
    // Netlify requires serverless target for optimal performance
    output: 'standalone', // or 'export' if you're doing static export
    
    // Enable React Strict Mode for better error detection
    reactStrictMode: true,
  
    // Essential for Supabase realtime and storage functionality
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.supabase.co',
        },
      ],
    },
  
    // Middleware configuration for API routes
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',
            },
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
          ],
        },
      ];
    },
  
    // Enable logging in production for debugging
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    
    // Configure environment variables explicitly
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  };
  
  export default nextConfig;