import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          My Blog
        </Link>
        <div className="space-x-4">
          <Link href="/blogs" className="text-white hover:underline">
            Blogs
          </Link>
          <Link href="/profile" className="text-white hover:underline">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}