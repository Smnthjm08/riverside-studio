import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="h-screen justify-center flex items-center gap-4">
      <div>Hesllo {session?.user?.name}</div>
    </main>
  );
}
