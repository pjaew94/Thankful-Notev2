import { motion } from "framer-motion";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import { fadeUpQuickVariant } from "../../../motion";
import { IGroupInfo, IHomeInfo, IUserInfo } from "../../../types";
import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavLeftDesktop from "../../Nav/Desktop/NavLeftDesktop";
import Text from "../../Text";

interface IHomeDesktop {
 homeInfo: IHomeInfo
}

const HomeDesktop: React.FC<IHomeDesktop> = ({
  homeInfo
}) => {

    const [showLogoutModal, setShowLogoutModal] = useState(false);
  let groupDateCreated = helperFunc.convertDate(homeInfo.group.createdAt);
  const havePostedToday = helperFunc.checkToday(homeInfo.updatedAt)

  return (
    <div className=" flex w-screen  min-h-screen">
        {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
      <NavLeftDesktop currentPage='home' groupRoute={`/group/${homeInfo.groupId}`} setShowLogoutModal={setShowLogoutModal} />

     

      <div className="ml-auto w-9/12 pt-10 pb-28">
        {/* Content */}
        <div className="flex flex-col w-9/12 px-16 xl:w-7/12 2xl:w-5/12">
          {/* Todays Post */}
          <motion.div
            className="py-10"
            variants={fadeUpQuickVariant}
            initial="initial"
            animate="animate"
            custom="0.2"
          >
            
              {havePostedToday && homeInfo.posts.length > 0 ? <div className="flex flex-col">
                <Text
                  type="h1Extra"
                  textEng={"Hey, " + homeInfo.firstName + "!"}
                  textKor={`안녕하세요 ${homeInfo.username}님!`}
                  customStyles="mb-10"
                />
                <Text
                  type="p"
                  textEng="You've already posted today!"
                  textKor="오늘 이미 포스트하셨습니다!"
                  customStyles="text-gray-500"
                />
                <Text
                  type="p"
                  textEng="Want to check out how your group was thankful today?"
                  textKor="오늘 그룹이 어떻게 감사했는지 볼까요?"
                  customStyles="mb-16 text-gray-500"
                />
                <CustomLink
                  route={`/group/${homeInfo.groupId}`}
                  textEng="Group"
                  textKor="그룹"
                  primary={true}
                />
              </div>
             : 
              <div className="flex flex-col">
                <Text
                  type="h1Extra"
                  textEng={"Welcome back, " + homeInfo.firstName + "!"}
                  textKor={`안녕하세요 ${homeInfo.username}님!`}
                  customStyles="mb-10"
                />
                <Text
                  type="p"
                  textEng="It looks like you haven't posted today. Let's not forget to take our daily breather and give thanks."
                  textKor="오늘 포스트를 아직 올리지 않으셧습니다. 하루마다 감사하는 것을 잊지 맙시다."
                  customStyles="text-gray-500"
                />
                <Text
                  type="p"
                  textEng="What are you waiting for?"
                  customStyles="mt-5 text-gray-500"
                />
                <Text
                  type="p"
                  textEng="Your group is waiting!"
                  customStyles="mb-16 text-gray-500"
                />
                <CustomLink
                  route="/post/form"
                  textEng="Get Started!"
                  textKor="시작하기"
                  primary={false}
                />
              </div>}
            
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="flex flex-col py-10"
            variants={fadeUpQuickVariant}
            initial="initial"
            animate="animate"
            custom="0.3"
          >
            <Text
              type="h1"
              textEng="Statistic"
              textKor="통계량"
              customStyles="mb-2"
            />
            <Text
              type="p"
              textEng="Here are a few things we know about you so far!"
              customStyles="text-gray-500"
            />

            <div className="flex flex-col mt-10 mb-10">
              <Text
                type="p"
                textEng={"🖐️ You've been a member since " + groupDateCreated}
                textKor={"🖐️ 감사노트 가입한 날짜: " + groupDateCreated}
                customStyles="mb-2"
              />
              <Text
                type="p"
                textEng={`📋 You've posted ${homeInfo.posts.length}  ${
                  homeInfo.posts.length === 1 ? "time." : "times."
                }`}
                textKor={"📋 게시올린 수: " + homeInfo.posts.length}
                customStyles="mb-2"
              />
              <Text
                type="p"
                textEng={
                  "❤️ You're associated with the group " + homeInfo.group.name
                }
                textKor={"❤️ 그룹 이름: " + homeInfo.group.name}
                customStyles="mb-2"
              />
              <Text
                type="p"
                textEng={`🙌 Your group posted ${homeInfo.group.posts.length}  ${
                  homeInfo.group.posts.length === 1 ? "time." : "times."
                }`}
                textKor={"🙌 그룹 게시올린 수: " + homeInfo.group.posts.length}
                customStyles="mb-2"
              />
            </div>

            <CustomLink
              route={`/user/${homeInfo.username}/posts`}
              textEng="My Posts"
              textKor="나의 게시물"
              primary={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeDesktop;
