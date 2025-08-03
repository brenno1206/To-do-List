import Link from 'next/link';

export function RegisterLink() {
  return (
    <p className="text-center text-sm text-white">
      Não tem uma conta?{' '}
      <Link
        href="/register"
        className="font-medium text-blue-100 hover:text-blue-300 hover:underline"
      >
        Cadastre-se
      </Link>
    </p>
  );
}
