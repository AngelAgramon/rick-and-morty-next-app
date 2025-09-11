// views/CharactersView.tsx
import React, { useEffect } from 'react';
import { useMVC } from '../context/MVCContext';
import { CharacterCard } from './CharacterCard';
import { CharacterGrid } from './CharacterGrid';
import { FavoritesSidebar } from './FavoritesSidebar';

export const CharactersView: React.FC = () => {
  const { character, ui, auth } = useMVC();

  useEffect(() => {
    if (auth.isAuthenticated) {
      character.loadCharacters();
    }
  }, [auth.isAuthenticated]);

  const handleSearch = (searchTerm: string) => {
    character.handleCharacterSearch(searchTerm);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    switch (filterType) {
      case 'status':
        character.setSelectedStatus(value);
        break;
      case 'species':
        character.setSelectedSpecies(value);
        break;
      case 'favorites':
        character.setShowOnlyFavorites(value === 'true');
        break;
      default:
        break;
    }
  };

  const handleToggleFavorite = (character: any) => {
    character.handleToggleFavorite(character);
  };

  const handleClearFilters = () => {
    character.clearFilters();
    character.loadCharacters();
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Acceso Denegado
        </h2>
        <p className="text-gray-600">
          Debes iniciar sesión para ver los personajes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar de Favoritos */}
      <FavoritesSidebar
        favorites={character.favorites}
        isOpen={ui.sidebarOpen}
        onClose={() => ui.setSidebarOpen(false)}
        onRemoveFavorite={(characterId) => character.removeFromFavorites(characterId)}
      />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Personajes de Rick and Morty
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => ui.toggleSidebar()}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <span className="sr-only">Abrir favoritos</span>
                  ❤️ Favoritos ({character.favorites.length})
                </button>
                <button
                  onClick={() => auth.logout()}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Filtros */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Búsqueda */}
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Buscar personajes..."
                value={character.filters.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filtro por Estado */}
            <select
              value={character.filters.selectedStatus}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              <option value="Alive">Vivo</option>
              <option value="Dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>

            {/* Filtro por Especie */}
            <select
              value={character.filters.selectedSpecies}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas las especies</option>
              <option value="Human">Humano</option>
              <option value="Alien">Alien</option>
              <option value="Robot">Robot</option>
              <option value="Animal">Animal</option>
            </select>

            {/* Mostrar solo favoritos */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={character.filters.showOnlyFavorites}
                onChange={(e) => handleFilterChange('favorites', e.target.checked.toString())}
                className="mr-2"
              />
              Solo favoritos
            </label>

            {/* Limpiar filtros */}
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Contenido */}
        <main className="flex-1 overflow-auto p-6">
          {character.loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando personajes...</p>
            </div>
          ) : character.error ? (
            <div className="text-center py-12">
              <div className="text-red-600 text-lg font-medium mb-2">
                Error al cargar personajes
              </div>
              <p className="text-gray-600 mb-4">{character.error}</p>
              <button
                onClick={() => character.loadCharacters()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <CharacterGrid
              characters={character.filteredCharacters}
              favorites={character.favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </main>
      </div>
    </div>
  );
};
