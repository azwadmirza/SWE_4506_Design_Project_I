import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: {
          host: 'localhost'
      },
      watch: {
        usePolling: true
    }
  }
  };

  return defineConfig(config);
};