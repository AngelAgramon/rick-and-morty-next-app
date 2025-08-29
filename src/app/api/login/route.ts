// app/api/login/route.ts
import { NextResponse } from 'next/server';

// Hardcoded user data - !!! WARNING: Not secure for production !!!
const users = [
	{ username: 'user', password: 'password' },
	{ username: 'admin', password: 'admin123' },
];

interface LoginRequestBody {
	username?: string;
	password?: string;
}

interface LoginResponseData {
	success: boolean;
	message?: string;
	token?: string;
}

export async function POST(request: Request) {
	const { username, password }: LoginRequestBody = await request.json();

	const user = users.find(u => u.username === username && u.password === password);

	if (user) {
		// In a real application, you would generate a JWT here
		return NextResponse.json<LoginResponseData>({ success: true, message: 'Login successful', token: 'fake-jwt-token-123' });
	} else {
		return NextResponse.json<LoginResponseData>({ success: false, message: 'Invalid username or password' }, { status: 401 });
	}
}
