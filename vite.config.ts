import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { applySeoToHtml } from "./src/lib/seo";

function localeHtmlPlugin(): Plugin {
  const isEnPath = (url?: string) =>
    Boolean(url && url.split("?")[0].split("#")[0].startsWith("/en"));

  return {
    name: "locale-html",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        return applySeoToHtml(html, isEnPath(ctx.originalUrl) ? "en" : "es");
      },
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (isEnPath(req.url)) {
          req.url = "/en.html";
        }
        next();
      });
    },
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (index && index.type === "asset" && typeof index.source === "string") {
        this.emitFile({
          type: "asset",
          fileName: "en.html",
          source: applySeoToHtml(index.source, "en"),
        });
      }
    },
    closeBundle() {
      const indexPath = path.resolve(process.cwd(), "dist/index.html");
      if (!fs.existsSync(indexPath)) return;
      const html = fs.readFileSync(indexPath, "utf8");
      fs.writeFileSync(path.resolve(process.cwd(), "dist/en.html"), applySeoToHtml(html, "en"));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: true,
    },
  },
  plugins: [
    react(),
    localeHtmlPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
