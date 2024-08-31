import { ThemeToggle } from "./Themetoggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const Header = async () => {
  const { isAuthenticated , getUser} = getKindeServerSession();
  const user = await getUser()

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
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}            
            />
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
