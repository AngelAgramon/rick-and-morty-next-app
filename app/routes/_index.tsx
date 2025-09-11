import { useState, useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useMVC } from '@/app/context/MVCContext';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { auth } = useMVC();

  // Verificar si ya está autenticado
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/characters');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const success = await auth.login({ username, password });
      
      if (success) {
        navigate('/characters');
      }
    } catch (error) {
      // Error manejado por el controlador
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#f8fafc',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>
            Rick and Morty App
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '16px',
            margin: '0'
          }}>
            Inicia sesión para acceder al multiverso
          </p>
        </div>
        
        {/* Card de login */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          padding: '32px',
          border: '1px solid #334155'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#e2e8f0',
                marginBottom: '8px'
              }}>
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#3b82f6';
                  (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#475569';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#e2e8f0',
                marginBottom: '8px'
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#3b82f6';
                  (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#475569';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={auth.loading}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: auth.loading ? '#64748b' : '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: auth.loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: auth.loading ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!auth.loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
                }
              }}
              onMouseLeave={(e) => {
                if (!auth.loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
                }
              }}
            >
              {auth.loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            
            {auth.error && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#7f1d1d',
                border: '1px solid #dc2626',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{
                  color: '#fca5a5',
                  fontSize: '14px',
                  margin: '0'
                }}>
                  {auth.error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;