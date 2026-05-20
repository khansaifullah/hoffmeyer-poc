import AuthGuard from "./_components/AuthGuard";
import AdminShell from "./_components/AdminShell";

export const metadata = {
  title: "Admin | Hoffmeyer",
};

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <AdminShell>{children}</AdminShell>
    </AuthGuard>
  );
}
