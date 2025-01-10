import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Jogo-de-Memoria-Naruto/',  // Substitua 'seu-repo' pelo nome do seu repositório
});
