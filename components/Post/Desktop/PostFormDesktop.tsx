import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../../../helpers/url";
import { fadeUpQuickVariant } from "../../../motion";
import { IGroupInfo, IMessage, IPostForm } from "../../../types";
import Button from "../../Buttons/Button";
import PostFormField from "../../FormFields/PostFormField";
import PostFormPrivateToggle from "../../FormFields/PostPrivateToggle";
import Loading from "../../Loading";
import LogoutModal from "../../Modals/LogoutModal";
import NavLeftDesktop from "../../Nav/Desktop/NavLeftDesktop";
import Text from "../../Text";

interface IPostFormMobile {
  todaysMessage: IMessage;
  userId: number;
  groupInfo: IGroupInfo;
}

const PostFormDesktop: React.FC<IPostFormMobile> = ({
  todaysMessage,
  userId,
  groupInfo,
}) => {
  const router = useRouter();
  const { id, bookEng, bookKor, msgKor, msgEng, chapAndVerse } = todaysMessage;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostForm>();

  const onSubmit = async (data: IPostForm) => {
    setIsLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const finalData = {
      ...data,
      isPrivate: isPrivate,
      msgId: id,
      userId,
      groupId: groupInfo.id,
    };
    console.log(finalData);

    try {
      const response = await axios.post(
        `${API_URL}/api/post/create`,
        JSON.stringify(finalData),
        config
      );
      router.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen  min-h-screen">
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
            {isLoading && <Loading />}
      <NavLeftDesktop
        currentPage="home"
        groupRoute={`/group/${groupInfo.id}`}
        setShowLogoutModal={setShowLogoutModal}
      />

      {/* Content */}
      <div className="ml-auto w-9/12 pt-10 pb-28">
      <div className="flex flex-col w-9/12 xl:w-7/12 2xl:w-5/12">


      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-10 py-10"
        variants={fadeUpQuickVariant}
        initial='initial'
        animate='animate'
        custom='0.2'
      >
        <Text type="h1Extra" textEng={"Day " + id} textKor={id+"??????"} customStyles="mb-10" />
        <Text type="h4" textEng="Today's Message" textKor='????????? ??????' customStyles="mb-5" />
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

        <div className="flex flex-col mb-16">
          <Text type="h4" textEng="Gratitude" textKor="?????????" />
          <Text
            type="p"
            textEng="What were 5 things you were thankful for today?"
            textKor="????????? ???????????? ???????????? ?????????????????????????"
            customStyles="text-gray-400 w-10/12  mt-2"
          />
          {errors.thoughtOnVerse1 ||
            errors.thoughtOnVerse2 ||
            errors.thoughtOnVerse3 ||
            errors.thoughtOnVerse4 ||
            (errors.thoughtOnVerse5 && (
              <Text
                type="error"
                textEng="You must include all 5 fields!"
                textKor="You must include all 5 fields!"
              />
            ))}
          <PostFormField
            field="thoughtOnVerse1"
            placeholder="1."
            register={register}
            customStyles="my-5"
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
          />
        </div>

        <div className="flex flex-col mb-16">
          <Text type="h4" textEng="Show Thanks" textKor="?????????" />
          <Text
            type="p"
            textEng="In what ways were you able to show your gratitude today?"
            textKor="?????? ????????? ????????? 3?????? ??????????"
            customStyles="text-gray-400 w-10/12 mt-2"
          />
          {errors.showThanks1 ||
            errors.showThanks2 ||
            (errors.showThanks3 && (
              <Text
                type="error"
                textEng="You must include all 3 fields!"
                textKor="You must include all 3 fields!"
              />
            ))}
          <PostFormField
            field="showThanks1"
            placeholder="1."
            register={register}
            customStyles="my-5"
          />
          <PostFormField
            field="showThanks2"
            placeholder="2."
            register={register}
            customStyles="mb-5"
          />
          <PostFormField
            field="showThanks3"
            placeholder="3."
            register={register}
            customStyles="mb-5"
          />
        </div>

        <PostFormPrivateToggle
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
        />
        <Button
          primary={false}
          textEng="Submit"
          textKor="?????????"
          customStyles="mt-16"
        />
      </motion.form>
    </div> 
    

      </div>
    </div>
  );
};

export default PostFormDesktop;
