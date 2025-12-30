import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { UserProvider } from '@/contexts/user-context';
import { Toaster } from 'sonner';

/**
 * Admin Layout
 * -------------
 * Layout wrapper for all /admin pages.
 * Includes sidebar navigation and header.
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="min-h-screen bg-void">
        <Toaster position="bottom-right" theme="dark" />
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="ml-64 transition-all duration-300">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
