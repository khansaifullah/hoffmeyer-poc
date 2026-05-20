export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] px-4 text-gray-900">
      {children}
    </div>
  );
}
