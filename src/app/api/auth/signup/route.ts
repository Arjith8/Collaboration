import { NextRequest, NextResponse } from 'next/server';
import { generateToken, hashPassword } from '@/lib/auth';
import { signupRequestBody } from '../../../../../types/signupRequestBody';
import prisma from '../../../../../prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = signupRequestBody.safeParse(body);
  if (!data.success) {
    console.warn('Invalid request body', data.error);
    return new Response(JSON.stringify({ errors: 'Invalid request body' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const { email, password, firstName, lastName } = data.data;
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({ data: {email, password: passwordHash, firstName, lastName }})

  const token = generateToken(user.id);

  return new Response(JSON.stringify({ message: 'Signup successful', token }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=43200; SameSite=Strict`,
    },
  });
}
