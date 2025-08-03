import Image from 'next/image';

interface HeaderProps {
  buttonFunction?: () => Promise<undefined>;
}

export function Header({ buttonFunction }: HeaderProps) {
  return (
    <header className="relative top-0 bg-[#5e4b45] w-full justify-between gap-3 flex p-2 px-6">
      <div>
        <Image alt="Logo" src={'/iconApp.png'} width={85} height={85} />
      </div>
      {buttonFunction && (
        <div className="flex gap-5 self-center">
          <button
            className="bg-[#473733] px-5 py-2 rounded-full text-[#eeeeee] hover:bg-[#372723]"
            onClick={buttonFunction}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
