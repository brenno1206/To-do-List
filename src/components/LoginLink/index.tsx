import Link from 'next/link';

export function LoginLink() {
  return (
    <p className="text-center text-sm text-white">
      Já tem uma conta?{' '}
      <Link
        href="/login"
        className="font-medium text-blue-100 hover:text-blue-300 hover:underline"
      >
        Faça login
      </Link>
    </p>
  );
}
