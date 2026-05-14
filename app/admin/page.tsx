import Link from 'next/link';

export default function AdminDashboard() {
  const cards = [
    { href: '/admin/produse', label: 'Produse', desc: 'Gestionează produsele și imaginile' },
    { href: '/admin/proiecte', label: 'Proiecte', desc: 'Adaugă proiecte cu locație pe hartă' },
    { href: '/admin/contact', label: 'Contact', desc: 'Editează date de contact și program' },
    { href: '/admin/despre', label: 'Despre Noi', desc: 'Text, cifre de referință și imagini' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-700 mb-1">{c.label}</h2>
            <p className="text-gray-500 text-sm">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
