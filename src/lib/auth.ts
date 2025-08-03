import NextAuth, { NextAuthOptions } from 'next-auth'; // ✅ Adicione a importação do NextAuth aqui
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { UserData } from '@/types/db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const query = 'SELECT * FROM User WHERE email = ? LIMIT 1';
        const [rows] = await pool.query<UserData[]>(query, [credentials.email]);
        const user = rows[0];
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!passwordsMatch) return null;
        return {
          id: user.idUser.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const handler = NextAuth(authOptions);
