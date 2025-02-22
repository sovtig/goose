import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    // ...any existing config you may have...
    define: {
        // This replaces process.env.ALPHA in your React code at build time
        'process.env.ALPHA': JSON.stringify(process.env.ALPHA === 'true'),
    },
});
