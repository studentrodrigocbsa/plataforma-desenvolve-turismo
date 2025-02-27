import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Permite que o Vite seja acessível por outros dispositivos
    port: 5173, // Porta padrão do Vite, altere se necessário
    strictPort: true, // Garante que a porta escolhida será usada
    allowedHosts: ["fa13-2804-14d-2a76-84d8-e4b2-d43d-1b41-1fb0.ngrok-free.app"], // Define a origem permitida
    cors: true, // Habilita CORS
    /*
    hmr: {
      clientPort: 443, // Necessário para funcionar corretamente com ngrok
    }
    */
  }
});
