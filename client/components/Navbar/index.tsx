import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Search Bar */}
      <section className="flex items-center gap-4 md:gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="size-8 dark:text-white" />
          </button>
        )}
        
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            type="search"
            placeholder="Search..."
            className="focus-within: w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder:text-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
          />
        </div>
      </section>

      {/* icons */}
      <section className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={`rounded p-2 ${isDarkMode ? "dark:hover:bggray700" : "hover:bg-gray-100"}`}
        >
          {isDarkMode ? (
            <Sun className="size-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="size-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={`size-min rounded p-2 ${isDarkMode ? "dark:hover:bggray700" : "hover:bg-gray-100"}`}
        >
          <Settings className="size-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] bg-gray-200 md:inline-block"></div>
      </section>
    </header>
  );
};

export default Navbar;
