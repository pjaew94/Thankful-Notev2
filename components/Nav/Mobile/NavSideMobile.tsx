import {
  ChevronRightIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import { LogoutIcon } from "@heroicons/react/solid";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import Text from "../../Text";
import Toggle from "../../Language/Toggle";

interface INavSideMobile {
    setShowLogoutModal: Dispatch<SetStateAction<boolean>>;
  setOpenSideNav: Dispatch<SetStateAction<boolean>>;
  openSideNav: boolean;
  currentPage: "home" | "group" | "post";
  groupRoute: string,
}

const NavSideMobile: React.FC<INavSideMobile> = ({
  setOpenSideNav,
  openSideNav,
  currentPage,
  setShowLogoutModal,
  groupRoute
}) => {
  return (
    <div
      className={`flex fixed top-0 w-full h-screen transition-all duration-500 ease-in-out z-40 ${
        openSideNav ? "left-0" : "left-full"
      }`}
    >
      {/* Left Backdrop to click to close */}
      <div className="w-5/12 md:w-8/12 h-full" onClick={() => setOpenSideNav(false)} />

      {/* Content */}
      <div className="relative flex flex-col px-10 py-16 w-7/12 h-full bg-gray-100 border-l border-gray-200 md:w-4/12">
        

        <button
          className="absolute top-8 right-10"
          onClick={() => setOpenSideNav(false)}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        
        <div className='mt-10'>
        <Toggle />
        </div>

        <Link href="/">
          <a className="flex items-center mt-24 mb-8 w-full relative">
            <HomeIcon className="w-4 h-4 mr-3" />
            <Text type="label" textEng="Home" textKor='홈' />
            {currentPage === "home" && (
              <div className="h-4 w-4 rounded-full bg-sunnyYellow ml-4" />
            )}
          </a>
        </Link>
        <Link href={groupRoute}>
          <a className="flex items-center w-full relative">
            <UserGroupIcon className="w-4 h-4 mr-3 " />
            <Text type="label" textEng="Group" textKor='그룹' />
            {currentPage === "group" && (
              <div className="h-4 w-4 rounded-full bg-sunnyYellow ml-4" />
            )}
          </a>
        </Link>

        <button className="flex items-center w-full relative mt-auto" onClick={() => setShowLogoutModal(true)}>
          <LogoutIcon className="w-4 h-4 mr-3 " />
          <Text type="label" textEng="Sign Out" textKor='로그아웃' />
        </button>
      </div>
    </div>
  );
};

export default NavSideMobile;
