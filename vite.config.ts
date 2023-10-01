import { defineConfig } from 'vite';
import million from 'million/compiler';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(mode);
  if (command === 'serve') {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        svgr({ svgrOptions: { titleProp: true } }),
      ],
    };
  } else {
    return {
      plugins: [
        million.vite({ auto: true }),
        react(),
        tsconfigPaths(),
        svgr({ svgrOptions: { titleProp: true } }),
      ],
    };
  }
});
