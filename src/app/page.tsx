import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}

export default async function Home() {
  let session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  //@ts-ignore
  return <SignOut>{`Welcome ${session.user.email}`}</SignOut>;
}
