import React from "react";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <header className=" border-b bg-background p-5 flex items-center">
      <div className=" container flex items-center justify-between">
        <Link href={"/"}>
          <h1 className=" font-bold text-3xl">
            Devraj<span className="text-primary">Sass</span>
          </h1>
        </Link>
        <div className=" flex items-center gap-x-5">
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <LogoutLink>
              <Button>Logout</Button>
            </LogoutLink>
          ) : (
            <div className=" flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
