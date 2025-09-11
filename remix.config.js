/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverDependenciesToBundle: [
    /^mobx/,
    /^mobx-react-lite/,
  ],
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_singleFetch: false, // Deshabilitar singleFetch para evitar problemas de Suspense
    v3_throwAbortReason: true,
  },
  // Configuración para evitar deadlocks de esbuild
  buildEnd: async () => {
    // Forzar limpieza de procesos
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  },
};