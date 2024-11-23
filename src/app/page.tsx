import { auth } from "../../auth";
import UserAvatar from "@/components/profile-dropdown";

export default async function Home() {
  const session = await auth();
  return (
    <main className="h-screen justify-center flex items-center gap-4">
      <div>
        <h6>{session?.user?.name}</h6>
        <p>{session?.user?.email}</p>
      </div>
      <UserAvatar />
    </main>
  );
}
