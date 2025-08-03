import { useRouter } from 'next/navigation';
export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('../../login')}
      className="w-full rounded-md bg-[#473733] px-6 py-2 font-semibold text-white transition-transform hover:scale-105 hover:bg-[#372723]"
    >
      Ir para Login
    </button>
  );
}
