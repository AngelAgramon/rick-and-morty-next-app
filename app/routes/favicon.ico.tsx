import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Redirigir a un favicon por defecto o devolver un ico vacío
  return redirect("/file.svg", 302);
}