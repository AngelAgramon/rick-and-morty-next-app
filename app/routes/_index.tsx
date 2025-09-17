import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Rick and Morty App
        </h1>
        <div className="space-y-4">
          <Link
            to="/characters"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200"
          >
            Ver Personajes
          </Link>
          <Link
            to="/auth"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-center transition duration-200"
          >
            Autenticación
          </Link>
        </div>
      </div>
    </div>
  );
}
