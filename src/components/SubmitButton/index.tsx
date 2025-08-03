interface InputProps {
  children: React.ReactNode;
}

export function SubmitButton({ children }: InputProps) {
  return (
    <button type={'submit'} className="submit">
      {children}
    </button>
  );
}
