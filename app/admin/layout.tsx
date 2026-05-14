import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-56 bg-white shadow-md flex flex-col">
        <div className="px-6 py-5 border-b">
          <span className="font-bold text-lg text-blue-700">Plastdu Admin</span>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/produse">Produse</NavLink>
          <NavLink href="/admin/proiecte">Proiecte</NavLink>
          <NavLink href="/admin/contact">Contact</NavLink>
          <NavLink href="/admin/despre">Despre Noi</NavLink>
        </nav>
        <div className="px-3 pb-4">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
    >
      {children}
    </Link>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="POST">
      <button
        type="submit"
        className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium transition"
      >
        Deconectare
      </button>
    </form>
  );
}
