interface InputProps {
  type: string;
  value: string;
  functionClick: (e: any) => void;
  placeholder: string;
}

export function Input({ type, value, functionClick, placeholder }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={functionClick}
      placeholder={placeholder}
      required
      className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#372723] text-[#5e4b45] bg-white"
    />
  );
}
