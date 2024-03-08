import Link from "next/link";

export default function Home() {
  return (
    <main className="w-100 flex min-h-screen flex-direction-column justify-center items-center gap-12 p-24">
      <Link key={"registro"} href={"/registro"}>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Registrar
        </button>
      </Link>

      <Link key={"login"} href={"/login"}>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Iniciar Sesión
        </button>
      </Link>
    </main>
  );
}
