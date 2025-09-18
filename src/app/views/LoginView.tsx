// app/(auth)/page.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component
import { useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from 'react';
import Layout from '../../../app/components/Layout';
import { authController } from '../../controllers';
import { observer } from 'mobx-react-lite'; 

const LoginView: React.FC = observer (() => {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const {getIsLoggedIn, login} = authController;
	const isAuthenticated = getIsLoggedIn;	

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/characters'); 
		}
	}, [isAuthenticated]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    	debugger

		login(username, password).then((success) => {
			if (success) {
				navigate('/characters'); 
			}
		});
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
						<button type='submit' className='btn-primary'>
							Login
						</button>
						<p className='info-message'>Try: username `user` | password `password`</p>
					</form>
				</div>
			</div>
		</Layout>
	);
});

export default LoginView;
