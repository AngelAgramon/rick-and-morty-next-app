import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CharacterGrid from "../components/CharacterGrid";
import Layout from "../components/Layout";
import { useAppContext } from "../context/AppContext";

export default function CharactersPage() {
  const { auth, characters, charactersLoading, charactersError, fetchCharacters } = useAppContext();
  const { isAuthenticated, logout } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    // Client-side authentication check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!isAuthenticated && !token) {
        navigate('/auth'); // Redirect to login if not authenticated
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && characters.length === 0 && !charactersLoading && !charactersError) {
      fetchCharacters();
    }
  }, [isAuthenticated, characters.length, fetchCharacters, charactersLoading, charactersError]);

  const handleLogout = () => {
    logout();
    navigate('/auth'); // Redirect to login page after logout
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className='redirect-message'>
          <p>Redirecting to login...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className='page-heading text-gradient teal-cyan'>Rick and Morty Characters</h1>
        <button onClick={handleLogout} className='btn-logout'>
          Logout
        </button>
      </div>

      {charactersLoading && <p className='loading-message'>Loading characters...</p>}
      {charactersError && <p className='error-message'>Error: {charactersError}</p>}
      {!charactersLoading && !charactersError && <CharacterGrid characters={characters} />}
    </Layout>
  );
}
