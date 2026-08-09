import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/inquiry', async (req, res) => {
        try {
          // Parse request body for POST requests
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              (req as any).body = body ? JSON.parse(body) : {};
            } catch {
              (req as any).body = {};
            }

            // Dynamically import handler to support TypeScript execution in Vite dev environment
            const handlerModule = await server.ssrLoadModule('/api/inquiry.ts');
            const handler = handlerModule.default;

            // Mock res.status and res.json helpers if missing
            const mockRes = {
              statusCode: 200,
              headers: {} as Record<string, string>,
              setHeader(key: string, value: string) {
                res.setHeader(key, value);
                return this;
              },
              status(code: number) {
                this.statusCode = code;
                res.statusCode = code;
                return this;
              },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = this.statusCode || 200;
                res.end(JSON.stringify(data));
                return this;
              },
            };

            await handler(req, mockRes);
          });
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: err?.message || 'Server Error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files into Node's process.env for local development middleware
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), apiDevMiddleware()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
