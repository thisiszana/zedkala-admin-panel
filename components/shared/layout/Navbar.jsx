import DarkLightMode from "./DarkLightMode";
import MobileNav from "./MobileNav";
import NavbarSearchBox from "./NavbarSearchBox";
import NotifcationBox from "./NotifcationBox";
import ShowProfile from "./ShowProfile";
import SignoutBtn from "./SignoutBtn";

export default function Navbar() {
  return (
    <header className="backdrop-blur-xl bg-white/70 dark:bg-slate-700 max-md:border-b border-b fixed z-20 left-0 right-0 top-0 p-4 pr-[280px] lg:pr-[270px] max-md:pr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <SignoutBtn style="p-2 hover:bg-gray-100 rounded-full Transition text-darkGray text-[22px] flex items-center gap-btn" />
          <NavbarSearchBox />
          <NotifcationBox />
          <ShowProfile />
          <DarkLightMode />
        </div>
      </div>
    </header>
  );
}
