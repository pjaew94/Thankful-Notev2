
import axios from "axios";
import { motion } from "framer-motion";

import {  useState } from "react";

import { helperFunc } from "../../../helpers/helperFunc";
import { API_URL } from "../../../helpers/url";

import { fadeUpQuickVariant } from "../../../motion";

import { IGroupInfo, IHomeInfo, IUserInfo } from "../../../types";

import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile"
import NavTopMobile from "../../Nav/Mobile/NavTopMobile"
import Text from "../../Text";


interface IHomeMobile {
    homeInfo: IHomeInfo
}

const HomeMobile:React.FC<IHomeMobile> = ({homeInfo}) => {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    let groupDateCreated = helperFunc.convertDate(homeInfo.group.createdAt)
    const havePostedToday = helperFunc.checkToday(homeInfo.updatedAt)





    return (
        <div className='w-full overflow-x-hidden pt-20 pb-20'>
            {console.log(homeInfo)}
 
            {/* Navbar and logout Modals all Absolute/sticky */}
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavTopMobile setOpenSideNav={setOpenSideNav} />
            <NavSideMobile setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} setShowLogoutModal={setShowLogoutModal} currentPage="home" groupRoute={`/group/${homeInfo.groupId}`} />

            {/* Content */}
            <div className='flex flex-col w-full'>
                {/* Todays Post */}
                 <motion.div className='px-10 py-10 border-b border-gray-200 md:px-48'
                variants={fadeUpQuickVariant}
                initial='initial'
                animate='animate'
                custom='0.2'
                >
                {havePostedToday && homeInfo.posts.length > 0 ? <div className='flex flex-col'>
                    <Text type='h1Extra' textEng={"Hey, " + homeInfo.firstName + "!"} customStyles='mb-10' />
                    <Text type='p' textEng="You've already posted today!" customStyles='text-gray-500' />
                    <Text type='p' textEng="Want to check out how your group was thankful today?" customStyles='mb-16 text-gray-500' />
                    <CustomLink route={`/group/${homeInfo.groupId}`} textEng='Group' primary={true} />
                    </div> : <div className='flex flex-col'>
                        <Text type='h1Extra' textEng={"Welcome back, " + homeInfo.firstName + "!"} customStyles='mb-10' />
                        <Text type='p' textEng="It looks like you haven't posted today. Let's not forget to take our daily breather and give thanks." customStyles='text-gray-500' />
                        <Text type='p' textEng="What are you waiting for?" customStyles='mt-5 text-gray-500' />
                        <Text type='p' textEng="Your group is waiting!" customStyles='mb-16 text-gray-500' />
                        <CustomLink route='/post/form' textEng='Get Started!' primary={false} />
                    </div>}
                </motion.div>


                {/* Statistics */}
                <motion.div className='flex flex-col py-10 px-10 md:px-48'
                                variants={fadeUpQuickVariant}
                                initial='initial'
                                animate='animate'
                                custom='0.3'
                >
                    <Text type='h1' textEng='Statistic' textKor='' customStyles='mb-2' />
                    <Text type='p' textEng="Here are a few things we know about you so far!" customStyles='text-gray-500' />
                    
                    <div className='flex flex-col mt-10 mb-10'>
                        <Text type='p' textEng={"🖐️ You've been a member since " + groupDateCreated}  textKor={"🖐️ 감사노트 가입한 날짜: " + groupDateCreated} customStyles='mb-2' />
                        <Text type='p' textEng={`📋 You've posted ${homeInfo.posts.length}  ${homeInfo.posts.length === 1 ? 'time.' : 'times.'}`}  textKor={"📋 게시올린 수: " + homeInfo.posts.length} customStyles='mb-2' />
                        <Text type='p' textEng={"❤️ You're associated with the group " + homeInfo.group.name}  textKor={"❤️ 그룹 이름: " + homeInfo.group.name} customStyles='mb-2' />
                        <Text type='p' textEng={`🙌 Your group posted ${homeInfo.group.posts.length}  ${homeInfo.group.posts.length === 1 ? 'time.' : 'times.'}`}   textKor={"🙌 그룹 게시올린 수: " + homeInfo.group.posts.length} customStyles='mb-2' />
                    </div>

                    <CustomLink 
                        route={`/user/${homeInfo.username}/posts`}
                        textEng='My Posts'
                        primary={false}
                    />
                </motion.div>


       
            </div>
        </div>
    )
}

export default HomeMobile
