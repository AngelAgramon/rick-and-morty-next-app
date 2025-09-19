// app/components/Layout.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import React from 'react';
import { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='min-h-screen bg-darker text-white font-inter flex flex-col items-center py-8'>
			<main className='nextjs-layout-container'>{children}</main>
		</div>
	);
};

export default Layout;
