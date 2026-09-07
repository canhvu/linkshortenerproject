import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const {userId} = await auth.protect();
  if (!userId) {
    redirect("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
