'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitButton } from '@/components/SubmitButton';
import { LoginLink } from '@/components/LoginLink';
import { Input } from '@/components/Input';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    <>
      <Header />
      <main className="background">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-[#5e4b45] p-8 shadow-md">
          <h2 className="title">Criar Conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              placeholder="Nome Completo"
              functionClick={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              value={email}
              placeholder="Email"
              functionClick={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              value={password}
              placeholder="Senha (mín. 6 caracteres)"
              functionClick={(e) => setPassword(e.target.value)}
            />
            <SubmitButton>Casastrar</SubmitButton>
          </form>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-center text-sm text-green-500">{success}</p>
          )}

          <LoginLink />
        </div>
      </main>
      <Footer />
    </>
  );
}
