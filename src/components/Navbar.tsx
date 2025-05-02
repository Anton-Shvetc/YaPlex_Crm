'use client'
import Link from "next/link";
import {  useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-white font-bold">
          Главная
        </Link>
        <div className="flex space-x-4">
          <Link href="/profile" className="text-white">
            Профиль
          </Link>
          <button onClick={logout} className="text-white hover:text-red-300">
            Выйти
          </button>
        </div>
      </div>
    </nav>
  );
}
