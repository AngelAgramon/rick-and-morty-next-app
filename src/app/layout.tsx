// app/layout.tsx
'use client'; // This directive indicates that this module should be treated as a Client Component

import { Inter } from 'next/font/google';
import Head from 'next/head'; // Using Head for title and meta tags
import React from 'react';
import { AppProvider } from '../context/AppContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<Head>
				<title>Rick and Morty App</title>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>
			<body className={inter.className}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
