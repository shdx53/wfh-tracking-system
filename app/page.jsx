import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default function Home() {
  return (
    <>
      <div>Home page</div>

      <div className="flex flex-col items-center space-y-4">
        <LoginLink>Log in</LoginLink>
        <LogoutLink>Log out</LogoutLink>

      </div>
    </>
  );
}
