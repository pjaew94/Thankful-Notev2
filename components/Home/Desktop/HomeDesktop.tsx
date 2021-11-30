import { motion } from "framer-motion";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import { fadeUpQuickVariant } from "../../../motion";
import { IGroupInfo, IUserInfo } from "../../../types";
import CustomLink from "../../Buttons/CustomLink";
import LogoutModal from "../../Modals/LogoutModal";
import NavLeftDesktop from "../../Nav/Desktop/NavLeftDesktop";
import Text from "../../Text";

interface IHomeDesktop {
  userInfo: IUserInfo;
  hasPostedToday: boolean;
  groupInfo: IGroupInfo;
}

const HomeDesktop: React.FC<IHomeDesktop> = ({
  userInfo,
  hasPostedToday,
  groupInfo,
}) => {

    const [showLogoutModal, setShowLogoutModal] = useState(false);
  let groupDateCreated = helperFunc.convertDate(groupInfo.createdAt);

  return (
    <div className=" flex w-screen  min-h-screen">
        {showLogoutModal && <LogoutModal setShowLogoutModal={setShowLogoutModal} />}
      <NavLeftDesktop currentPage='home' groupRoute={`/group/${groupInfo.id}`} setShowLogoutModal={setShowLogoutModal} />

    

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
            {hasPostedToday ? (
              <div className="flex flex-col">
                <Text
                  type="h1Extra"
                  textEng={"Hey, " + userInfo.firstName + "!"}
                  customStyles="mb-10"
                />
                <Text
                  type="p"
                  textEng="You've already posted today!"
                  customStyles="text-gray-500"
                />
                <Text
                  type="p"
                  textEng="Want to check out how your group was thankful today?"
                  customStyles="mb-16 text-gray-500"
                />
                <CustomLink
                  route={`/group/${userInfo.groupId}`}
                  textEng="Group"
                  primary={true}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <Text
                  type="h1Extra"
                  textEng={"Welcome back, " + userInfo.firstName + "!"}
                  customStyles="mb-10"
                />
                <Text
                  type="p"
                  textEng="It looks like you haven't posted today. Let's not forget to take our daily breather and give thanks."
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
                  primary={false}
                />
              </div>
            )}
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
              textKor=""
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
                textEng={`📋 You've posted ${userInfo.posts.length}  ${
                  userInfo.posts.length === 1 ? "time." : "times."
                }`}
                textKor={"📋 게시올린 수: " + userInfo.posts.length}
                customStyles="mb-2"
              />
              <Text
                type="p"
                textEng={
                  "❤️ You're associated with the group " + groupInfo.name
                }
                textKor={"❤️ 그룹 이름: " + groupInfo.name}
                customStyles="mb-2"
              />
              <Text
                type="p"
                textEng={`🙌 Your group posted ${groupInfo.posts.length}  ${
                  groupInfo.posts.length === 1 ? "time." : "times."
                }`}
                textKor={"🙌 그룹 게시올린 수: " + groupInfo.posts.length}
                customStyles="mb-2"
              />
            </div>

            <CustomLink
              route={`/user/${userInfo.username}/posts`}
              textEng="My Posts"
              primary={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeDesktop;
