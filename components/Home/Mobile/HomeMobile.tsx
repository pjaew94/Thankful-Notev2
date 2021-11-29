import { motion } from "framer-motion";
import { userInfo } from "os";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

import { IUserInfo } from "../../../types";

import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile"
import NavTopMobile from "../../Nav/Mobile/NavTopMobile"
import Text from "../../Text";


interface IHomeMobile {
    userInfo: IUserInfo,
    havePostedToday: boolean;
}

const HomeMobile:React.FC<IHomeMobile> = ({userInfo, havePostedToday}) => {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className='w-full overflow-x-hidden'>
 
            {/* Navbar and logout Modals all Absolute/sticky */}
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavTopMobile setOpenSideNav={setOpenSideNav} />
            <NavSideMobile setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} setShowLogoutModal={setShowLogoutModal} currentPage="home" />

            {/* Content */}
            <div className='flex flex-col w-full'>

                {/* Todays Post */}
                {/* <motion.div className='px-10 py-10 border-b border-gray-200'>
                    {havePostedToday ? <div></div> : <div className='flex flex-col'>
                        <Text type='h1' textEng={"Welcome back, " + userInfo.firstName + "!"} customStyles='text-6xl  mb-10' />
                        <Text type='p' textEng="It looks like you haven't posted today. Let's not forget to take our daily breather and give thanks." customStyles='text-gray-500' />
                        <Text type='p' textEng="What are you waiting for?" customStyles='mt-5 text-gray-500' />
                        <Text type='p' textEng="Your group is waiting!" customStyles='mb-16 text-gray-500' />
                        <CustomLink route='/post-form' textEng='Get Started!' primary={false} />
                    </div>}
                </motion.div> */}


                {/* Statistics */}
                <button onClick={() => helperFunc.checkToday('2021-11-28 01:59:25.986')}>
                    TEST
                </button>
                 
            </div>
        </div>
    )
}

export default HomeMobile
