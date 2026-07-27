import "./globals.css";
import Navbar from "../components/navbar"; // Sesuaikan 'navbar' huruf kecil sesuai nama file kamu

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen">
        {/* Navbar dipasang di paling atas */}
        <Navbar />

        {/* Tampilan halaman lain akan dirender di sini */}
        <main>{children}</main>
      </body>
    </html>
  );
}