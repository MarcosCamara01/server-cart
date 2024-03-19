import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Session } from "next-auth";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  if (session) {
    redirect('/add-to-cart');
  } else {
    redirect('/login');
  }
}
