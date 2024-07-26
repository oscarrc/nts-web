import { defineConfig, loadEnv } from 'vite'

import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

export default ({ mode }) => {
    let env = loadEnv(mode, process.cwd());

    return defineConfig({
        base: '/',
        server: {    
            open: true, 
            port: 3000,
            host: true,
            watch: {
                usePolling: true
            }
        },
        build: {
            outDir: "build",
            emptyOutDir: true
        },
        plugins: [,
            react(),
            VitePWA({ 
                registerType: 'autoUpdate',
                manifest: {
                    "short_name": "NTS-web",
                    "name": "NTS-1 web controller",
                    "description": "An NTS-1 web controller, editor and sequencer",
                    "screenshots": [
                      {
                        "src": "static/media/feature.png",
                        "type": "image/png",
                        "sizes": "1024x500",
                        "form_factor": "wide"
                      }
                    ],
                    "categories": ["Music", "Midi", "Synthesizer"],
                    "dir": "ltr",
                    "lang": "en",
                    "icons": [
                      {
                        "src": "favicon.ico",
                        "sizes": "64x64",
                        "type": "image/x-icon"
                      },
                      {
                        "src": "static/media/icons/icon192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                      },
                      {
                        "src": "static/media/icons/icon512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                      },
                      {
                        "src": "static/media/icons/icon.png",
                        "type": "image/png",
                        "sizes": "1024x1024",
                        "purpose": "maskable"
                      }
                    ],
                    "scope": "/",
                    "start_url": ".",
                    "display": "standalone",
                    "theme_color": "#f3cc62",
                    "background_color": "#212122",
                    "orientation": "any",
                    "related_applications": [
                      {
                        "platform": "web",
                        "url": "https://nts-web.oscarrc.me"
                      }, 
                      {
                        "platform": "play",
                        "url": "https://play.google.com/store/apps/details?id=me.oscarrc.nts_web.twa",
                        "id": "me.oscarrc.nts_web.twa"
                      }
                    ]
                },
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
                    maximumFileSizeToCacheInBytes: 3000000,
                    runtimeCaching: []
                }
            }),
            viteCompression()
        ]
    })
}