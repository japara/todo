import React from "react";
import background from "../images/Group.svg";
import prof2 from "../images/profile2.png";
import google from "../images/google.svg";

function SignIn() {
  return (
    <div className="flex justify-center items-center font-Roboto">
      <img
        src={background}
        alt="background"
        className="my-[-94px] mr-[194px]"
      ></img>
      <div className="bg-[#F6F6F7] flex flex-col justify-center items-center p-6 w-[669px] h-[768px]">
        <img src={prof2} alt="Sign In" className="h-[79px] w-[79px]" />
        <div className="form-container">
          <h2 className="text-[#0059AC] text-[36px] font-500 font-roboto">
            Sign In
          </h2>
          <form>
            <div className="flex flex-col">
              <input
                type="text"
                id="username"
                placeholder="Enter your username or email"
                required
                className="w-[476px] h-[56px] mb-[16px] items-center border-[1px] border-solid border-[#E6E8EB] rounded-[12px] pl-[16px] text-[14px] text-[#5F6571]"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                className="w-[476px] h-[56px] items-center border-[1px] border-solid border-[#E6E8EB] rounded-[12px] pl-[16px] text-[14px] text-[#5F6571]"
              />
            </div>
            <div className="text-left text-[14px] text-[#252931] font-400 mt-[14px]">
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="bg-[#477EE7] text-white text-[16px] font-500 rounded-[30px] w-full h-[56px] mt-[24px]"
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="border-t border-[#CFD3DA] flex-grow"></div>
            <p className="px-4 text-[14px] text-[#252931]">Or</p>
            <div className="border-t border-[#CFD3DA] flex-grow"></div>
          </div>
          <button className="flex w-full bg-transparent justify-center items-center text-black text-[16px] border-[1px] border-solid border-[#CFD3D9] font-500 rounded-[30px] h-[56px] mt-[16px]">
            <img src={google} alt="google-logo" className="mr-[12px]"></img>{" "}
            Sign in with Google
          </button>
          <div className="sign-up-link mt-[16px] text-[#252931]">
            <p className="text-[14px] font-400">
              Don't have an account?{" "}
              <a href="/sign-up" className=" font-500 underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
