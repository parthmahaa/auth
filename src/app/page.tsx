import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to Our Authentication System</h1>
      <p className="text-xl text-white mb-8">Sign up or log in to get started</p>
      <div className="space-x-4">
        <button  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          <Link href="/signup">Sign Up</Link>
        </button>
        <button  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          <Link href="/login">Log In</Link>
        </button>
      </div>
    </div>
  </div>
  );
}
