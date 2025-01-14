import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sefin',
  plugins: [react()],
  build: {
    // outDir: '../wargas.github.io/sefin',
    
  }
})
