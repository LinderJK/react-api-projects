import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import reactVitest from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [process.env.VITEST ? reactVitest() : remix()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx,js, jsx}'],
      exclude: ['src/types/*.ts'],
    },
  },
  define: {
    _global: ({})
  }
})
