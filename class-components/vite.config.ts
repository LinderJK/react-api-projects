import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [remix()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
  define: {
    _global: ({})
  }
})
