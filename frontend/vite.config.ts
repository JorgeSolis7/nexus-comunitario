import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      // En desarrollo, redirige /api al backend .NET
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:5080',
        changeOrigin: true,
      },
    },
  },
  // `npm run preview`: sirve la versión compilada (dist/).
  preview: {
    port: 5181,
    strictPort: true,
    // Permite compartirla temporalmente mediante un túnel rápido de Cloudflare.
    allowedHosts: ['.trycloudflare.com'],
  },
})
