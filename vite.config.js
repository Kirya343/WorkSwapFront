import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ← вот это нужно добавить
import { fileURLToPath } from 'url'

// Получаем путь к текущей папке
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "#": path.resolve(__dirname, "./public"),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        preview: {
            allowedHosts: ['workswap.org'] // твой домен
        }
    },
    define: {
        global: 'window'
    },
    preview: {
        port: 8080    // <-- порт для `vite preview`
    }
})