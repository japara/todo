import searchIcon from "../images/search.svg";
import arrow from "../images/arrowDown.svg";
import sun from "../images/sun.svg";
import star from "../images/star.svg";
import { UserButton } from "@clerk/clerk-react";
import Todo from "./Todo";
import Chart from "./Chart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";

function Home() {
  const { user } = useUser();
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const getTodos = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);
    return data;
  };

  const { data: todos = [] } = useQuery({
    queryKey: ["todos", user?.id],
    queryFn: getTodos,
    enabled: !!user,
  });

  return (
    <>
      <div className="flex justify-end items-center py-[14px] border-b border-[#C7CAD0]-300 bg-[#F6F6F7] max-w-full">
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

        <div className="flex items-center gap-2 mr-[40px] ml-[499px]">
          <p className="flex text-[14px] font-500 gap-2">
            EN <img src={arrow} alt="arrow"></img>
          </p>
          <UserButton />
        </div>
      </div>
      <div className="w-[290px] pt-[101px] h-full flex flex-col items-center border-r border-[#C7CAD0]-300 absolute bg-[#F6F6F7] top-0 ">
        <a
          href="#"
          onClick={() => {
            setShowImportantOnly(false);
            setShowChart(false);
          }}
          className="h-[48px] w-[252px] flex items-center py-[13px]"
        >
          <img src={sun} alt="sun" className="ml-[16px] mr-[12px]" />
          My Day
        </a>
        <a
          href="#"
          onClick={() => {
            setShowImportantOnly(true);
            setShowChart(false);
          }}
          className="h-[48px] w-[252px] flex items-center py-[13px]"
        >
          <img src={star} alt="important" className="ml-[16px] mr-[12px]" />
          Important
        </a>
        <a
          href="#"
          onClick={() => {
            setShowChart(true);
            setShowImportantOnly(false);
          }}
          className="h-[48px] w-[252px] flex items-center py-[13px]"
        >
          <img src={sun} alt="chart" className="ml-[16px] mr-[12px]" />
          Chart
        </a>
      </div>
      <div className="w-[75%] absolute left-[300px]">
        {showChart ? (
          <Chart todos={todos} />
        ) : (
          <Todo todos={todos} showImportantOnly={showImportantOnly} />
        )}
      </div>
    </>
  );
}
export default Home;
