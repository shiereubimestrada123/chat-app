interface ImportMetaEnv {
  VITE_API_BASE: string;
}

interface ViteProxy {
  '/api': string;
}

interface UserConfig {
  proxy?: ViteProxy;
}