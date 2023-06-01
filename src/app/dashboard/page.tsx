import PageLayout from "@/components/shared/pageLayout";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session: any = await getServerSession();
  console.log("session", session);
  if (session?.error) {
    <div>Login</div>;
  }
  return <PageLayout></PageLayout>;
}
