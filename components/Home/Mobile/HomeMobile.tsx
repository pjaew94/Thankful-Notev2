
import { motion } from "framer-motion";

import {  useState } from "react";

import { helperFunc } from "../../../helpers/helperFunc";

import { fadeUpQuickVariant } from "../../../motion";

import { IGroupInfo, IUserInfo } from "../../../types";

import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile"
import NavTopMobile from "../../Nav/Mobile/NavTopMobile"
import Text from "../../Text";


interface IHomeMobile {
    userInfo: IUserInfo,
    hasPostedToday: boolean;
    groupInfo: IGroupInfo
}

const HomeMobile:React.FC<IHomeMobile> = ({userInfo, hasPostedToday, groupInfo}) => {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    let groupDateCreated = helperFunc.convertDate(groupInfo.createdAt)


    return (
        <div className='w-full overflow-x-hidden pt-20 pb-20'>
 
            {/* Navbar and logout Modals all Absolute/sticky */}
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavTopMobile setOpenSideNav={setOpenSideNav} />
            <NavSideMobile setOpenSideNav={setOpenSideNav} openSideNav={openSideNav} setShowLogoutModal={setShowLogoutModal} currentPage="home" />

            {/* Content */}
            <div className='flex flex-col w-full'>
    
                {/* Todays Post */}
                <motion.div className='px-10 py-10 border-b border-gray-200'
                variants={fadeUpQuickVariant}
                initial='initial'
                animate='animate'
                custom='0.2'
                >
                    {hasPostedToday ? <div className='flex flex-col'>
                    <Text type='h1Extra' textEng={"Hey, " + userInfo.firstName + "!"} customStyles='mb-10' />
                    <Text type='p' textEng="You've already posted today!" customStyles='text-gray-500' />
                    <Text type='p' textEng="Want to check out how your group was thankful today?" customStyles='mb-16 text-gray-500' />
                    <CustomLink route={`/group/${userInfo.groupId}/posts`} textEng='Group' primary={true} />
                    </div> : <div className='flex flex-col'>
                        <Text type='h1Extra' textEng={"Welcome back, " + userInfo.firstName + "!"} customStyles='mb-10' />
                        <Text type='p' textEng="It looks like you haven't posted today. Let's not forget to take our daily breather and give thanks." customStyles='text-gray-500' />
                        <Text type='p' textEng="What are you waiting for?" customStyles='mt-5 text-gray-500' />
                        <Text type='p' textEng="Your group is waiting!" customStyles='mb-16 text-gray-500' />
                        <CustomLink route='/post/form' textEng='Get Started!' primary={false} />
                    </div>}
                </motion.div>


                {/* Statistics */}
                <motion.div className='flex flex-col py-10 px-10'
                                variants={fadeUpQuickVariant}
                                initial='initial'
                                animate='animate'
                                custom='0.3'
                >
                    <Text type='h1' textEng='Statistic' textKor='' customStyles='mb-2' />
                    <Text type='p' textEng="Here are a few things we know about you so far!" customStyles='text-gray-500' />
                    
                    <div className='flex flex-col mt-10 mb-10'>
                        <Text type='p' textEng={"🖐️ You've been a member since " + groupDateCreated}  textKor={"🖐️ 감사노트 가입한 날짜: " + groupDateCreated} customStyles='mb-2' />
                        <Text type='p' textEng={`📋 You've posted ${userInfo.posts.length}  ${userInfo.posts.length === 1 ? 'time.' : 'times.'}`}  textKor={"📋 게시올린 수: " + userInfo.posts.length} customStyles='mb-2' />
                        <Text type='p' textEng={"❤️ You're associated with the group " + groupInfo.name}  textKor={"❤️ 그룹 이름: " + groupInfo.name} customStyles='mb-2' />
                        <Text type='p' textEng={`🙌 Your group posted ${groupInfo.posts.length}  ${groupInfo.posts.length === 1 ? 'time.' : 'times.'}`}   textKor={"🙌 그룹 게시올린 수: " + groupInfo.posts.length} customStyles='mb-2' />
                    </div>

                    <CustomLink 
                        route={`/user/${userInfo.username}/posts`}
                        textEng='My Posts'
                        primary={false}
                    />
                </motion.div>


            </div>
        </div>
    )
}

export default HomeMobile
