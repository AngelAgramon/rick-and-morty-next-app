import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAppContext } from "../context/AppContext";

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { auth } = useAppContext();
  const { loading, error, isAuthenticated, login } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/characters'); // Redirect on successful authentication
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 4rem)' }}>
        <h1 className='main-page-heading text-gradient green-blue'>Welcome to the Rick and Morty App</h1>
        <div className='card' style={{ maxWidth: '448px', width: '100%' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-white)' }}>Login</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label
                htmlFor='username'
                style={{ display: 'block', color: 'var(--text-gray-300)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='input-field'
                placeholder='Enter your username'
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                style={{ display: 'block', color: 'var(--text-gray-300)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='input-field'
                placeholder='Enter your password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn-primary' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className='error-message'>{error}</p>}
            <p className='info-message'>Try: username `user` | password `password`</p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
