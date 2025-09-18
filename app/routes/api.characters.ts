import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3002";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // Obtener parámetros de consulta de la URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Construir URL del backend con parámetros
    const backendUrl = new URL(`${BACKEND_URL}/characters`);
    searchParams.forEach((value, key) => {
      backendUrl.searchParams.append(key, value);
    });

    // Hacer petición al backend NestJS
    const response = await fetch(backendUrl.toString());
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("Error fetching characters from backend:", error);
    return json({
      error: "Failed to fetch characters from backend"
    }, { status: 500 });
  }
}
