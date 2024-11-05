import searchIcon from "../images/search.svg";
import arrow from "../images/arrowDown.svg";
import sun from "../images/sun.svg";
import star from "../images/star.svg";
import { UserButton } from "@clerk/clerk-react";
import Todo from "./Todo";

function Home() {
  return (
    <>
      <div className="flex justify-end items-center py-[14px] border-b border-[#C7CAD0]-300 bg-[#F6F6F7] max-w-full">
        {/* Search Input Container */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img src={searchIcon} alt="Search Icon" className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-2 pl-10 w-[460px] h-[40px] py-[10px] rounded-[8px] focus:outline-none text-black"
          />
        </div>

        {/* Language and Profile Picture Container */}
        <div className="flex items-center gap-2 mr-[40px] ml-[499px]">
          <p className="flex text-[14px] font-500 gap-2">
            EN <img src={arrow} alt="arrow"></img>
          </p>
          <UserButton />
        </div>
      </div>
      <div className="w-[290px] pt-[101px] h-full flex flex-col items-center border-r border-[#C7CAD0]-300 absolute bg-[#F6F6F7] top-0 ">
        <a href="#" className="h-[48px] w-[252px] flex items-center py-[13px]">
          <img src={sun} alt="sun" className="ml-[16px] mr-[12px]"></img>My Day
        </a>
        <a href="#" className="h-[48px] w-[252px] flex items-center py-[13px]">
          <img src={star} alt="sun" className="ml-[16px] mr-[12px]"></img>
          Important
        </a>{" "}
        <a href="#" className="h-[48px] w-[252px] flex items-center py-[13px]">
          <img src={sun} alt="sun" className="ml-[16px] mr-[12px]"></img>Chart
        </a>
      </div>
      <div className="w-[75%] absolute left-[300px]">
        <Todo />
      </div>
    </>
  );
}
export default Home;
