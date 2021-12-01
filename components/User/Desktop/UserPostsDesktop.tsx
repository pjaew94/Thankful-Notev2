import { motion } from "framer-motion";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import { fadeUpQuickVariant } from "../../../motion";
import { IGroupInfo, IUserInfo } from "../../../types";
import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavLeftDesktop from "../../Nav/Desktop/NavLeftDesktop";
import PostsList from "../../Post/Mobile/PostsList";
import Text from "../../Text";

interface IUserPostsMobile {
    userInfo: IUserInfo,
visitorInfo: IUserInfo
}


const UserPostsDesktop:React.FC<IUserPostsMobile> = ({userInfo, visitorInfo}) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className='flex w-screen  min-h-screen'>
            {console.log(userInfo)}
            {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
            <NavLeftDesktop currentPage='' groupRoute={`/group/${visitorInfo.groupId}`} setShowLogoutModal={setShowLogoutModal} />

            <div className="ml-auto w-9/12 pt-16 pb-28">
            <div className='w-full overflow-x-hidden pb-20'>

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
                    <Text type='p' textEng='Day' textKor='날' customStyles='col-span-2 text-center text-gray-400' />
                    <Text type='p' textEng='By' textKor='글쓴자' customStyles='col-span-2 text-center text-gray-400' />
                    <Text type='p' textEng='Preview' textKor='글쓴자' customStyles='col-span-3 text-center text-gray-400' />
                    <Text type='p' textEng='Date' textKor='날짜' customStyles='col-span-3 text-center text-gray-400' />
                    <Text type='p' textEng='Private?' textKor='비밀' customStyles='col-span-2 text-center text-gray-400' />
                    
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
            </div>
        </div>
    )
}

export default UserPostsDesktop
