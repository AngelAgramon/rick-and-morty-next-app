#!/bin/bash

# Script para ejecutar frontend y backend en desarrollo

echo "🚀 Iniciando Rick and Morty App..."

# Función para limpiar procesos al salir
cleanup() {
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar backend
echo "📡 Iniciando backend en puerto 3001..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Esperar un poco para que el backend inicie
sleep 3

# Iniciar frontend
echo "🌐 Iniciando frontend en puerto 5173..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Ambos servidores iniciados:"
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:5173"
echo "   Presiona Ctrl+C para detener ambos servidores"

# Esperar a que termine cualquiera de los procesos
wait