import { motion } from "framer-motion";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import { fadeUpQuickVariant } from "../../../motion";
import { IGroupInfo, IUserInfo } from "../../../types";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile";
import NavTopMobile from "../../Nav/Mobile/NavTopMobile";
import PostsList from "../../Post/Mobile/PostsList";
import Text from "../../Text";
import MembersList from "../MembersList";

interface IGroupMobile {
  groupInfo: IGroupInfo;
  visitorInfo: IUserInfo;
}

const GroupMobile: React.FC<IGroupMobile> = ({ groupInfo, visitorInfo }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [membersOrPosts, setMembersOrPosts] = useState<"posts" | "members" >(
    "posts"
  );
  const dateConverted = helperFunc.convertDate(groupInfo.createdAt);
  return (
    <div className="w-full overflow-x-hidden pt-20 pb-20" style={{WebkitOverflowScrolling: "touch"}}>
      {/* Navbar and logout Modals all Absolute/sticky */}
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
      <NavTopMobile setOpenSideNav={setOpenSideNav} />
      <NavSideMobile
        setOpenSideNav={setOpenSideNav}
        openSideNav={openSideNav}
        setShowLogoutModal={setShowLogoutModal}
        currentPage="group"
        groupRoute={`/group/${groupInfo.id}`}
      />

      {/* Content */}
      <motion.div
        className="flex flex-col py-10 px-10"
        variants={fadeUpQuickVariant}
        initial="initial"
        animate="animate"
        custom={0.2}
      >
        <Text
          type="h1"
          textEng="Group"
          textKor="그룹"
          customStyles="font-normal text-gray-400 mb-5"
        />
        <Text
          type="h1Extra"
          textEng={groupInfo.name}
          textKor={groupInfo.name}
          customStyles="mb-10"
        />
        <Text
          type="p"
          textEng={`❤️ Your group was created on ${dateConverted}.`}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={`🙌 There are ${groupInfo.users.length} members in your group.`}
          customStyles="mb-2"
        />
        <Text
          type="p"
          textEng={`📋 Your group has a total of ${groupInfo.posts.length} posts.`}
        />

        <div className="w-full grid grid-cols-2 gap-3 my-10 top-0">
          <button
            className={`py-3 font-bold ${
              membersOrPosts === "posts"
                ? " border-b-2 border-black"
                : " text-gray-400"
            }`}
            onClick={() => setMembersOrPosts("posts")}
          >
            View Posts
          </button>
          <button
            className={`py-3 font-bold ${
              membersOrPosts === "members"
                ? " border-b-2 border-black"
                : " text-gray-400"
            }`}
            onClick={() => setMembersOrPosts("members")}
          >
            See Members
          </button>
        </div>

        {membersOrPosts === "posts" ? (
          <div className="" style={{WebkitOverflowScrolling: "touch"}}>
            {/* Post Template */}
            <div className="grid grid-cols-12 gap-2 mb-3">
              <Text
                type="p"
                textEng="Day"
                textKor="날"
                customStyles="col-span-3 text-center text-gray-400"
              />
              <Text
                type="p"
                textEng="Date"
                textKor="날짜"
                customStyles="col-span-6 text-center text-gray-400"
              />
              <Text
                type="p"
                textEng="Private?"
                textKor="비밀"
                customStyles="col-span-3 text-center text-gray-400"
              />
            </div>
            {groupInfo.posts.map((p) => {
              return (
                <PostsList
                  key={p.createdAt}
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
              );
            })}
          </div>
        ) : (
          <motion.div
            className=""
            variants={fadeUpQuickVariant}
            initial="initial"
            animate="animate"
          >
            {/* Template */}
            <div className="grid grid-cols-12 gap-2 mb-3">
              <Text
                type="p"
                textEng="Name"
                textKor="이름"
                customStyles="col-span-3 text-center text-gray-400"
              />
              <Text
                type="p"
                textEng="Joined"
                textKor="조인 날짜"
                customStyles="col-span-6 text-center text-gray-400"
              />
              <Text
                type="p"
                textEng="Post #"
                textKor="게시물 수"
                customStyles="col-span-3 text-center text-gray-400"
              />
            </div>

            {groupInfo.users.map((u) => {
              return (
                <MembersList
                  key={u.id}
                  username={u.username}
                  firstName={u.firstName}
                  lastName={u.lastName}
                  currentDay={u.currentDay}
                  createdAt={u.createdAt}
                  visitorUsername={visitorInfo.username}
                />
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GroupMobile;
