'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Algo deu errado');
      }

      setSuccess(data.message);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#473733] p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-[#5e4b45] p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-white">
          Criar Conta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome Completo"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-[#372723] text-[#5e4b45] bg-white"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-[#372723] text-[#5e4b45] bg-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha (mín. 6 caracteres)"
            required
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-[#372723] text-[#5e4b45] bg-white"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[#473733]  px-4 py-2 font-semibold text-white transition-colors hover:bg-[#372723]"
          >
            Cadastrar
          </button>
        </form>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {success && (
          <p className="text-center text-sm text-green-500">{success}</p>
        )}
        <p className="text-center text-sm text-white">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-100 hover:text-blue-300 hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}
