import http from 'http';
import httpProxy from 'http-proxy';
import { DOMINIO } from './infra/domain';

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
    if (req.url?.startsWith('/api')) {
        proxy.web(req, res, { target: 'http://localhost:8080' }); // Local API
    } else {
        proxy.web(req, res, { target: 'http://localhost:5173' }); // Vite dev server
    }
});

server.listen(443, () => {
    console.log(`Reverse proxy running on ${DOMINIO}`);
});
