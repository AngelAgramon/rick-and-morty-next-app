import { useNavigate, useSearchParams } from "@remix-run/react";
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { authController } from '../controllers';
import { observer } from 'mobx-react-lite'; 

const LoginView: React.FC = observer (() => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const {login} = authController;

	const handleSubmit = async (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		login(username, password).then((success) => {
			if (success) {
				navigate('/characters'); 
			}
		});
	};

	const handleRegisterClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		navigate('/register');
	};

	return (
		<Layout>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 4rem)' }}>
				<h1 className='main-page-heading text-gradient green-blue'>Welcome to the Rick and Morty App.</h1>
				<div className='card' style={{ maxWidth: '448px', width: '100%' }}>
					<h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-white)' }}>Login</h2>
					{searchParams.get('accountCreated') === 'true' && (
						<div style={{ 
							backgroundColor: '#dcfce7', 
							border: '1px solid #86efac', 
							color: '#166534', 
							padding: '0.75rem', 
							borderRadius: '0.375rem', 
							fontSize: '0.875rem',
							marginBottom: '1.5rem',
							textAlign: 'center'
						}}>
							Account created successfully! You can now log in.
						</div>
					)}
					<form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
						<button type='submit' className='btn-primary'
							onClick={handleSubmit}
						>
							Login
						</button>
						<p className='info-message'>Try: username `user` | password `password`</p>
						<p style={{ textAlign: 'center', marginTop: '1rem' }}>
							Not a member? <span 
								style={{ color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}
								onClick={handleRegisterClick}
							>
								Sign Up now
							</span>
						</p>
					</form>
				</div>
			</div>
		</Layout>
	);
});

export default LoginView;