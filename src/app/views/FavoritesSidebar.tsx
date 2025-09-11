
import { observer } from 'mobx-react-lite';
import { useCharacterStore, useUIStore } from '../stores/StoreContext';
import CharacterCard from './CharacterCard';

export const FavoritesSidebar = observer(() => {
  const characterStore = useCharacterStore();
  const uiStore = useUIStore();

  if (!uiStore.sidebarOpen) return null;

  return (
    <div className="favorites-sidebar fixed right-0 top-0 h-full w-80 overflow-y-auto z-50">
      <div className="p-6 border-b border-neon-purple">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            ⭐ Favoritos ({characterStore.favoritesCount})
          </h2>
          <button
            onClick={() => uiStore.setSidebarOpen(false)}
            className="text-purple-400 hover:text-white transition-colors text-2xl"
            title="Cerrar sidebar"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {characterStore.favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-gray-400 text-lg">
              No tienes personajes favoritos aún
            </p>
            <p className="text-gray-500 text-sm mt-2">
              ¡Marca algunos personajes como favoritos para verlos aquí!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {characterStore.favorites.map(character => (
              <div key={character.id} className="border border-neon-purple rounded-xl p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <CharacterCard character={character} />
                <button
                  onClick={() => characterStore.toggleFavorite(character)}
                  className="mt-4 w-full btn-logout"
                >
                  ❌ Remover de favoritos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}); 