import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { UserData } from '@/types/db';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    /**
     * Validations
     */
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios.' },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'A senha deve ter no mínimo 6 caracteres.' },
        { status: 400 },
      );
    }

    /**
     * Checks if a user with the email already exists
     */
    const userQuery = 'SELECT * FROM User WHERE email = ? LIMIT 1';
    const [existingUsers] = await pool.query<UserData[]>(userQuery, [email]);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'Este email já está em uso.' },
        { status: 409 },
      );
    }

    /**
     * Encrypt password and save new user
     */
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery =
      'INSERT INTO User (name, email, password) VALUES (?, ?, ?)';
    await pool.query(insertQuery, [name, email, hashedPassword]);

    return NextResponse.json(
      { message: 'Usuário criado com sucesso!' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { message: 'Erro ao criar usuário.' },
      { status: 500 },
    );
  }
}
