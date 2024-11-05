import background from "../images/Group.svg";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center font-Roboto">
      <img
        src={background}
        alt="background"
        className="my-[-94px] mr-[194px]"
      />
      <div className="bg-[#F6F6F7]">
        <SignIn />
      </div>
    </div>
  );
}
