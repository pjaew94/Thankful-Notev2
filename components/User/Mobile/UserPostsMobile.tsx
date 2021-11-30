import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUpQuickVariant } from "../../../motion";
import { IUserInfo } from "../../../types"
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile";
import NavTopMobile from "../../Nav/Mobile/NavTopMobile";
import PostsList from "../../Post/Mobile/PostsList";
import Text from "../../Text";




interface IUserPostsMobile {
    userInfo: IUserInfo,
    visitorInfo: IUserInfo
 
}



const UserPostsMobile:React.FC<IUserPostsMobile> = ({userInfo, visitorInfo}) => {

    const [openSideNav, setOpenSideNav] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    
    return (
        <div className='w-full overflow-x-hidden pt-28 pb-20'>
            {/* Navbar and logout Modals all Absolute/sticky */}
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavTopMobile setOpenSideNav={setOpenSideNav} />
            <NavSideMobile setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} setShowLogoutModal={setShowLogoutModal} currentPage="post" groupRoute={`/group/${userInfo.groupId}`} />

            <motion.div className='flex flex-col px-10'
                variants={fadeUpQuickVariant}
                initial='initial'
                animate='animate'
                custom={0.2}
            >
                <Text type='h1Extra' textEng={`${userInfo.firstName}'s Posts`} customStyles='mb-2' />
                <Text type='p' textEng={`${userInfo.firstName} is currently on day ${userInfo.currentDay}/153.`} customStyles='text-gray-400 mb-10' />

                {/* Post Template */}
                <div className='grid grid-cols-12 gap-2 mb-3'>
                    <Text type='p' textEng='Day' textKor='날' customStyles='col-span-3 text-center text-gray-400' />
                    <Text type='p' textEng='Date' textKor='날짜' customStyles='col-span-6 text-center text-gray-400' />
                    <Text type='p' textEng='Private?' textKor='비밀' customStyles='col-span-3 text-center text-gray-400' />
                    
                </div>
                {userInfo.posts.map((p) => {
                    return <PostsList 
                        key={p.msgId}
                        author={p.author.firstName}
                        authorUsername={p.author.username}
                        createdAt={p.createdAt}
                        isPrivate={p.isPrivate}
                        thoughtOnVerse1={p.thoughtOnVerse1}
                        thoughtOnVerse2={p.thoughtOnVerse2}
                        thoughtOnVerse3={p.thoughtOnVerse3}
                        thoughtOnVerse4={p.thoughtOnVerse4}
                        thoughtOnVerse5={p.thoughtOnVerse5}
                        showThanks1={p.showThanks1}
                        showThanks2={p.showThanks2}
                        showThanks3={p.showThanks3}
                        msgId={p.msgId}
                        bookEng={p.msg.bookEng}
                        bookKor={p.msg.bookKor}
                        msgEng={p.msg.msgEng}
                        msgKor={p.msg.msgKor}
                        id={p.id}
                        chapAndVerse={p.msg.chapAndVerse}
                        visitorUsername={visitorInfo.username}

                    />
                })}
            </motion.div>
           
        </div>
    )
}

export default UserPostsMobile
