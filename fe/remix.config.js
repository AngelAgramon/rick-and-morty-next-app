/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    v2_meta: true,
    v2_routeConvention: true,
  },
  watchPaths: ["./app"],  // Remix observa cambios en la carpeta 'app'
  serverModuleFormat: "esm",
  serverDependenciesToBundle: ["mobx", "mobx-react-lite"],
};

