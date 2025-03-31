import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
      '@components': path.resolve('src/common/'),
      '@hook': path.resolve('src/common/hooks'),
      images: path.resolve('src/assets/'),
    },
  },
})
