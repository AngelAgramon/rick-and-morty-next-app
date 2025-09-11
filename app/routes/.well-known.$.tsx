import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Manejar todas las rutas .well-known (como Chrome DevTools)
  return new Response(null, { status: 404 });
}