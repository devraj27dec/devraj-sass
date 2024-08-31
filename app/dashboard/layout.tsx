import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import DashboardNav from "../components/DashboardNav";
import { stripe } from "../lib/stripe";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
}) {
  noStore(); // Ensure data isn't cached

  // Check if the user exists in the database
  let user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = [firstName, lastName].filter(Boolean).join(" ").trim();
    user = await prisma.user.create({
      data: {
        id,
        email,
        name: name || null,
        stripeCustomerId: "",
      },
    });
  }
  if (!user.stripeCustomerId) {
    try {
      const stripeCustomer = await stripe.customers.create({ email });
      await prisma.user.update({
        where: { id },
        data: { stripeCustomerId: stripeCustomer.id },
      });
    } catch (error) {
      console.error("Error creating Stripe customer or updating user:", error);
    }
  }
}


export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  await getData({
    email: user.email as string,
    firstName: user.given_name as string,
    id: user.id as string,
    lastName: user.family_name as string,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
