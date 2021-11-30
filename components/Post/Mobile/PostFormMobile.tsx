import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../../helpers/url";
import { IMessage, IPostForm } from "../../../types";
import PostFormField from "../../FormFields/PostFormField";
import LogoutModal from "../../Modals/LogoutModal";
import NavSideMobile from "../../Nav/Mobile/NavSideMobile";
import NavTopMobile from "../../Nav/Mobile/NavTopMobile";
import Text from "../../Text";

interface IPostFormMobile {
  todaysMessage: IMessage;
}
const PostFormMobile: React.FC<IPostFormMobile> = ({ todaysMessage }) => {
  const { id, bookEng, bookKor, msgKor, msgEng, chapAndVerse } = todaysMessage;
  const [openSideNav, setOpenSideNav] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostForm>();

  const onSubmit = async () => {};

  return (
    <div className="w-full flex flex-col min-h-[812px]">
      {/* Navbar and logout Modals all Absolute/sticky */}
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
      <NavTopMobile setOpenSideNav={setOpenSideNav} />
      <NavSideMobile
        setOpenSideNav={setOpenSideNav}
        openSideNav={openSideNav}
        setShowLogoutModal={setShowLogoutModal}
        currentPage="home"
      />
      {console.log(todaysMessage)}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-10 py-10"
      >
        <Text type="h1Extra" textEng={"Day " + id} customStyles="mb-10" />
        <Text type="h4" textEng="Today's Message" customStyles="mb-5" />
        <Text
          type="p"
          textEng={'"' + msgEng + '"'}
          textKor={"'" + msgKor + "'"}
          customStyles="mb-5"
        />
        <div className="flex justify-end mb-10">
          {bookEng && bookKor && (
            <Text
              type="p"
              textEng={bookEng + ":"}
              textKor={bookKor + ":"}
              customStyles="mr-2 text-gray-400"
            />
          )}
          {chapAndVerse && (
            <Text
              type="p"
              textEng={chapAndVerse}
              textKor={chapAndVerse}
              customStyles="text-gray-400"
            />
          )}
        </div>

        <div className="flex flex-col">
          <Text type="h4" textEng="Gratitude" textKor="감사함" />
          <Text
            type="p"
            textEng="What were 5 things you were thankful for today?"
            textKor="오늘은 다섯가지 감사한게 무엇이있었습니까?"
            customStyles="text-gray-400 w-10/12 mb-5"
          />
          <PostFormField
            field="thoughtOnVerse1"
            placeholder="1."
            register={register}
            customStyles="mb-5"
          />
          <PostFormField
            field="thoughtOnVerse2"
            placeholder="2."
            register={register}
            customStyles="mb-5"
          />
          <PostFormField
            field="thoughtOnVerse3"
            placeholder="3."
            register={register}
            customStyles="mb-5"
          />
          <PostFormField
            field="thoughtOnVerse4"
            placeholder="4."
            register={register}
            customStyles="mb-5"
          />
          <PostFormField
            field="thoughtOnVerse5"
            placeholder="5."
            register={register}
            customStyles="mb-5"
          />
        </div>
      </form>
    </div>
  );
};

export default PostFormMobile;
