import background from "../images/Group.svg";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center font-Roboto h-screen">
      <img
        src={background}
        alt="background"
        className="hidden md:block my-[-94px] mr-[194px]"
      />
      <div className="bg-[#F6F6F7] w-full md:w-auto flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
