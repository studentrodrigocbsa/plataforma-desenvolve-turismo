import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Permite que o Vite seja acessível por outros dispositivos
    port: 5173, // Porta padrão do Vite, altere se necessário
    strictPort: true, // Garante que a porta escolhida será usada
    allowedHosts: ["2d38-2804-56c-d5ef-6700-562-fec3-d018-3300.ngrok-free.app"], // Define a origem permitida
    cors: true, // Habilita CORS
    /*
    hmr: {
      clientPort: 443, // Necessário para funcionar corretamente com ngrok
    }
    */
  }
});
