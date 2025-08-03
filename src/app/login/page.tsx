'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { SubmitButton } from '@/components/SubmitButton';
import { RegisterLink } from '@/components/RegisterLink';

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
    <main className="background">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-[#5e4b45] p-8 shadow-md">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            functionClick={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            value={email}
          />
          <Input
            functionClick={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            value={password}
          />

          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <SubmitButton>Entrar</SubmitButton>
        </form>
        <RegisterLink />
      </div>
    </main>
  );
}
