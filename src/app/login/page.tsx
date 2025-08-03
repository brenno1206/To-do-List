'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Email ou senha inválidos.');
    } else {
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#473733] p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-[#5e4b45] p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#372723] text-[#5e4b45] bg-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#372723] text-[#5e4b45] bg-white"
          />
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-[#473733] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#372723]"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-white">
          Não tem uma conta?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-100 hover:text-blue-300 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
