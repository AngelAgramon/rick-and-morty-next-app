// app/(auth)/page.tsx

import React from 'react';
import { useNavigate } from '@remix-run/react';
import { LoginView } from '../views/LoginView';

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	return <LoginView />;
};

export default LoginPage;
