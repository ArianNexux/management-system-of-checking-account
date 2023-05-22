export default function Home() {
  return (
    <main className="h-screen flex align-center items-center justify-center bg-gray-50">
      <form className="px-8 py-10 w-3/12 justify-center bg-white">
        <div>
          <h1 className="font-alt">Conta Corrente</h1>
        </div>
        <input type="email" />
        <input type="password" />
        <input type="submit" className="block" value="Fazer login" />
      </form>
    </main>
  )
}
