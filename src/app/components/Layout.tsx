// app/components/Layout.tsx

import React from 'react';
import { useNavigate } from '@remix-run/react';
import { useAuth, useUI } from '../context/MVCContext';
import { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const auth = useAuth();
	const ui = useUI();

	const handleLogout = () => {
		auth.logout();
		navigate('/');
	};

	return (
		<div className={`min-h-screen ${ui.isDarkMode ? 'bg-space' : 'bg-darker'} text-white font-inter flex flex-col items-center py-8`}>
			{/* Header espacial con controles */}
			{(auth.isAuthenticated || auth.token) && (
				<div className="page-container mb-6">
					<div className="space-header rounded-xl p-6">
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-4">
								<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
									Rick & Morty App
								</h1>

							</div>
							<div className="flex justify-end space-x-4">
								<button
									onClick={handleLogout}
									className="btn-logout"
								>
									🚪 Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			
			<main className='nextjs-layout-container'>{children}</main>
		</div>
	);
};

export default Layout;
