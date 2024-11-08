import searchIcon from "../images/search.svg";
import arrow from "../images/arrowDown.svg";
import sun from "../images/sun.svg";
import star from "../images/star.svg";
import { UserButton } from "@clerk/clerk-react";
import Todo from "./Todo";
import Chart from "./Chart";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/clerk-react";

function Home() {
  const { user } = useUser();
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center py-3 px-4 border-b bg-[#F6F6F7]">
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <div className="relative flex-grow md:pl-[300px] md:flex-grow-0">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block border rounded p-2 pl-4 w-full md:w-[460px] h-[40px] rounded-[8px] focus:outline-none text-black"
          />
        </div>
        <div className="flex items-center gap-2">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="w-5 h-5 md:hidden"
          />
          <p className="text-sm font-medium flex items-center gap-2">
            EN <img src={arrow} alt="arrow" />
          </p>
          <UserButton />
        </div>
      </div>

      <div className="flex flex-1">
        <div
          ref={menuRef}
          className={`bg-[#F6F6F7] fixed top-0 left-0 w-[200px] h-auto md:static md:w-[290px] transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 border-r z-50`}
        >
          <div className="pt-16">
            <a
              href="#"
              onClick={() => {
                setShowImportantOnly(false);
                setShowChart(false);
                setMenuOpen(false);
              }}
              className="block h-[48px] w-full flex items-center px-4 py-3"
            >
              <img src={sun} alt="sun" className="ml-[16px] mr-[12px]" />
              My Day
            </a>
            <a
              href="#"
              onClick={() => {
                setShowImportantOnly(true);
                setShowChart(false);
                setMenuOpen(false);
              }}
              className="block h-[48px] w-full flex items-center px-4 py-3"
            >
              <img src={star} alt="important" className="ml-[16px] mr-[12px]" />
              Important
            </a>
            <a
              href="#"
              onClick={() => {
                setShowChart(true);
                setShowImportantOnly(false);
                setMenuOpen(false);
              }}
              className="block h-[48px] w-full flex items-center px-4 py-3"
            >
              <img src={sun} alt="chart" className="ml-[16px] mr-[12px]" />
              Chart
            </a>
          </div>
        </div>

        <div className="flex-1 px-4 py-4">
          {showChart ? (
            <Chart todos={todos} />
          ) : (
            <Todo todos={todos} showImportantOnly={showImportantOnly} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
