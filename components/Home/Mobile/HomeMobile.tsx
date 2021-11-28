import { useState } from "react";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile"
import NavTopMobile from "../../Nav/Mobile/NavTopMobile"




const HomeMobile:React.FC = () => {
    const [openSideNav, setOpenSideNav] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className='flex flex-col w-full overflow-x-hidden'>
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavTopMobile setOpenSideNav={setOpenSideNav} />
            <NavSideMobile setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} setShowLogoutModal={setShowLogoutModal} currentPage="home" />
        </div>
    )
}

export default HomeMobile
