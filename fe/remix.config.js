/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    v2_meta: true,
    v2_routeConvention: true,
  },
  watchPaths: ["./app", "./src"],  // Esto asegura que Remix observe cambios en la carpeta 'app
};

