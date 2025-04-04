import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Permite que o Vite seja acessível por outros dispositivos
    port: 5173, // Porta padrão do Vite, altere se necessário
    strictPort: true, // Garante que a porta escolhida será usada
    allowedHosts: ["11ce-2804-56c-d5ef-6700-a5f1-25b2-748b-58f8.ngrok-free.app"], // Domínio
    cors: true, // Habilita CORS
    /*
    hmr: {
      clientPort: 443, // Necessário para funcionar corretamente com ngrok
    }
    */
  }
});
