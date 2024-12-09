import NotifcationBox from "../notifcation/NotifcationBox";
import NavbarSearchBox from "../search/NavbarSearchBox";
import DarkLightMode from "./DarkLightMode";
import ShowProfile from "./ShowProfile";
import SignoutBtn from "./SignoutBtn";
import MobileNav from "./MobileNav";

export default function Navbar({ isCollapsed }) {
  return (
    <header
      className={`backdrop-blur-[5px] bg-white/70 dark:bg-dark2/70 max-md:border-b border-b dark:border-none fixed z-20 left-0 top-0 right-0 p-4 transition-all duration-300 ease-in-out  ${
        isCollapsed ? "pr-[85px]" : "pr-[280px] lg:pr-[270px] max-lg:pr-4"
      }`}
    >
      <div className="flex items-center justify-between flex-row-reverse">
        <div className="flex items-center gap-[8px]">
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShowProfile />
          <DarkLightMode />
          <NavbarSearchBox />
          <NotifcationBox />
          <SignoutBtn style="p-2 hover:bg-gray-100 rounded-full Transition text-darkGray text-[22px] flex items-center gap-btn" />
        </div>
      </div>
    </header>
  );
}
