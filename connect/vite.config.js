import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV'],
  commonjsOptions: {
    esmExternals: true,
  },
  server: {
    host: true,
    port: 4173
    },
  },
);
