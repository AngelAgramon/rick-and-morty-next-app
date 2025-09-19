import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Handle Chrome DevTools requests silently
  if (url.pathname.startsWith('/.well-known/')) {
    return new Response(null, { status: 404 });
  }
  
  // Redirect other 404s to home
  throw new Response(null, { status: 404 });
}

export default function CatchAll() {
  return null;
}
