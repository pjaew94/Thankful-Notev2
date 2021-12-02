import { Dispatch, SetStateAction } from "react"
import LogoLink from "../../Buttons/LogoLink";
import { motion } from "framer-motion";

interface INavTopMobile {
  setOpenSideNav: Dispatch<SetStateAction<boolean>>
}


const NavTopMobile: React.FC<INavTopMobile> = ({setOpenSideNav}) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-between w-full bg-gray-100 border-b border-gray-200 px-10 py-5 z-50">
      <div className='-translate-y-1'>
      <LogoLink yellow={true} />
      </div>

      {/* Burger */}
      <motion.button className='px-3 py-2 flex flex-col justify-between items-end'
        whileTap={{scale: 0.95}}
        onClick={() => setOpenSideNav(true)}
      >
          <div className='w-7 h-1 bg-black rounded-3xl mb-2' />
          <div className='w-5 h-1 bg-black rounded-3xl' />
      </motion.button>
    </div>
  );
};

export default NavTopMobile;


