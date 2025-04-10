import { defineConfig } from 'vite';
import { DOMINIO } from './front/app/infra/domain';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
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
    allowedHosts: [DOMINIO.replace('https://','')], // Domínio
    cors: true, // Habilita CORS
  }
});
