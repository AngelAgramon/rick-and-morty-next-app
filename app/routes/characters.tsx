import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { observer } from 'mobx-react-lite';
import { useMVC } from '@/app/context/MVCContext';
import CharacterGrid from '@/app/components/CharacterGrid';
import { FavoritesSidebar } from '@/app/components/FavoritesSidebar';
import Layout from '@/app/components/Layout';
import Pagination from '@/app/components/Pagination';

const CharactersPage = observer(() => {
  const navigate = useNavigate();
  const { auth, character, ui } = useMVC();
  const [searchTerm, setSearchTerm] = useState('');
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // Verificar que character y characters estén definidos antes de acceder a length
    if (character && character.characters && character.characters.length === 0) {
      character.loadCharacters();
    }
  }, [auth.isAuthenticated, character?.characters?.length, navigate]);

  // Sincronizar el estado local con el controlador
  useEffect(() => {
    if (character && character.filters) {
      setSearchTerm(character.filters.searchTerm || '');
    }
  }, [character?.filters?.searchTerm]);

  // Funciones wrapper para forzar actualización
  const handleToggleFavorite = async (characterData: any) => {
    console.log('🔄 [CharactersPage] Toggle favorite clicked:', characterData.name);
    console.log('🔄 [CharactersPage] Character controller:', character);
    console.log('🔄 [CharactersPage] Character favorites:', character.favorites);
    console.log('🔄 [CharactersPage] Current favorites before:', character.favorites?.length || 0);
    
    if (character && character.toggleFavorite) {
      try {
        await character.toggleFavorite(characterData);
        console.log('🔄 [CharactersPage] Current favorites after:', character.favorites?.length || 0);
      } catch (error) {
        console.error('❌ [CharactersPage] Error toggling favorite:', error);
      }
    } else {
      console.error('❌ [CharactersPage] Character controller or toggleFavorite method not available');
    }
    
    setForceUpdate(prev => prev + 1);
  };

  const handleShowOnlyFavorites = (showOnly: boolean) => {
    console.log('🔄 [CharactersPage] Show only favorites:', showOnly);
    character.setShowOnlyFavorites(showOnly);
    setForceUpdate(prev => prev + 1);
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  // Verificar que el contexto esté completamente inicializado
  if (!character || !auth) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #334155',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{
            color: '#94a3b8',
            fontSize: '18px',
            margin: '0'
          }}>Inicializando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '24px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            {/* Título y descripción */}
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#f8fafc',
                margin: '0 0 8px 0',
                textAlign: 'center'
              }}>
                {character?.filters?.showOnlyFavorites ? 'Mis Favoritos' : 'Personajes de Rick y Morty'}
              </h1>
              <p style={{
                color: '#94a3b8',
                fontSize: '16px',
                margin: '0',
                textAlign: 'center'
              }}>
                {character?.filters?.showOnlyFavorites 
                  ? `${character?.filteredCharacters?.length || 0} personajes favoritos encontrados`
                  : `${character?.characters?.length || 0} personajes encontrados en el multiverso`
                }
              </p>
            </div>
            
            {/* Controles */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center'
            }}>
              {/* Búsqueda */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                <input
                  type="text"
                  placeholder="Buscar personajes..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    if (character && character.setSearchTerm) {
                      character.setSearchTerm(value);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 12px',
                    backgroundColor: '#334155',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#3b82f6'
                }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Botones */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => handleShowOnlyFavorites(!character?.filters?.showOnlyFavorites)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: character?.filters?.showOnlyFavorites ? '#f59e0b' : '#334155',
                    color: '#f8fafc',
                    border: character?.filters?.showOnlyFavorites ? 'none' : '1px solid #475569',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = character?.filters?.showOnlyFavorites ? '#d97706' : '#475569';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = character?.filters?.showOnlyFavorites ? '#f59e0b' : '#334155';
                  }}
                >
                  <span>{character?.filters?.showOnlyFavorites ? 'Ver Todos' : 'Solo Favoritos'}</span>
                  {character?.favorites?.length > 0 && (
                    <span style={{
                      backgroundColor: character?.filters?.showOnlyFavorites ? 'rgba(0, 0, 0, 0.2)' : '#dc2626',
                      color: character?.filters?.showOnlyFavorites ? '#f8fafc' : '#ffffff',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {character?.favorites?.length || 0}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    auth.logout();
                    navigate('/');
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#dc2626',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#b91c1c';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626';
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {character?.loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #334155',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }}></div>
              <p style={{
                color: '#94a3b8',
                fontSize: '18px',
                margin: '0'
              }}>Cargando personajes del multiverso...</p>
            </div>
          </div>
        ) : character?.error ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{
              color: '#fca5a5',
              fontSize: '20px',
              marginBottom: '16px'
            }}>¡Oh no! Algo salió mal en el multiverso</div>
            <p style={{
              color: '#94a3b8',
              marginBottom: '24px'
            }}>{character?.error}</p>
            <button
              onClick={() => character?.loadCharacters?.()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3b82f6',
                color: '#f8fafc',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <>
            <CharacterGrid 
              characters={character?.filteredCharacters || []} 
              onToggleFavorite={handleToggleFavorite}
            />
            
            {/* Componente de paginación */}
            {character?.pagination && character.pagination.totalPages > 1 && (
              <Pagination
                currentPage={character.pagination.currentPage}
                totalPages={character.pagination.totalPages}
                totalItems={character.pagination.totalItems}
                pageSize={character.pagination.pageSize}
                onPageChange={(page) => character.changePage(page)}
                loading={character.loading}
              />
            )}
          </>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

export default CharactersPage;