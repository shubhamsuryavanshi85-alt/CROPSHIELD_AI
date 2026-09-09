import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import chatHandler from './api/ai/chat.js';
import advisoryHandler from './api/ai/advisory.js';
import healthHandler from './api/ai/health.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'cropshield-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url?.split('?')[0];
            if (url === '/api/ai/chat') {
              return chatHandler(req, res);
            }
            if (url === '/api/ai/advisory') {
              return advisoryHandler(req, res);
            }
            if (url === '/api/ai/health') {
              return healthHandler(req, res);
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 5173,
      open: false,
    },
  };
});
