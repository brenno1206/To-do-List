interface FooterProps {
  email?: string;
}

export function Footer({ email }: FooterProps) {
  return (
    <footer className="absolute bottom-0 bg-[#5e4b45] w-full justify-around gap-3 flex p-2">
      {email && <p className="text-[#eeeeee]">Logado como {email}</p>}
      <p className="text-[#eeeeee]">Todos os direitos Reservados &copy; </p>
    </footer>
  );
}
