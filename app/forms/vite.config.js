import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    host: true, // Permite que o Vite seja acessível por outros dispositivos
    port: 5173, // Porta padrão do Vite, altere se necessário
    strictPort: true, // Garante que a porta escolhida será usada
    allowedHosts: ["13b0-2804-56c-d5dd-4b00-9105-1565-740a-bfb6.ngrok-free.app"], // Domínio
    cors: true, // Habilita CORS
    hmr: {
      clientPort: 443, // Necessário para funcionar corretamente com ngrok
    }
  }
});
