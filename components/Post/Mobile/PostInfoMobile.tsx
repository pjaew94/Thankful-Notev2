import { ReplyIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IPostInfoMobileState } from "../../../types";
import Text from "../../Text";

export interface IPostInfoMobile {
  showPostInfoMobile: IPostInfoMobileState;
  setShowPostInfoMobile: Dispatch<SetStateAction<IPostInfoMobileState>>;
}

const PostInfoMobile: React.FC<IPostInfoMobile> = ({
  showPostInfoMobile,
  setShowPostInfoMobile,
}) => {
  const {
    msgId,
    author,
    createdAt,
    thoughtOnVerse1,
    thoughtOnVerse2,
    thoughtOnVerse3,
    thoughtOnVerse4,
    thoughtOnVerse5,
    showThanks1,
    showThanks2,
    showThanks3,
    bookEng,
    bookKor,
    msgEng,
    msgKor,
    chapAndVerse,
    authorUsername,
    show,
  } = showPostInfoMobile;

  return (
    <div
      className={`flex flex-col fixed top-0 bottom-0 right-0 w-screen min-h-screen bg-gray-100 z-50 pt-10 pb-24 overflow-y-scroll transition-all duration-500 ease-in-out  ${
        show ? "left-0" : "left-full"
      }`}
    >


      <div className="w-full flex px-10">
        <motion.button
          onClick={() =>
            setShowPostInfoMobile({ ...showPostInfoMobile, show: false })
          }
          whileTap={{ scale: 0.95 }}
        >
          <ReplyIcon className="h-7 w-7" />
        </motion.button>
      </div>


      <div className="flex flex-col py-5 px-10 border-b border-gray-200 w-full mt-5 md:mt-16">
        <Text type="h1Extra" textEng={"Day " + msgId} customStyles="mb-10" />
        <Text type="p" textEng={`😊 Author: ${author} (${authorUsername})`} />
        <Text type="p" textEng={`🕐 Date: ${createdAt}`} customStyles="mb-10" />

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
      </div>



      <div className="flex flex-col py-5 px-10 border-b border-gray-200 w-full">
        <Text
          type="p"
          textEng={`1. ${thoughtOnVerse1}`}
          textKor={`1. ${thoughtOnVerse1}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`2. ${thoughtOnVerse2}`}
          textKor={`2. ${thoughtOnVerse2}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`3. ${thoughtOnVerse3}`}
          textKor={`3. ${thoughtOnVerse3}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`4. ${thoughtOnVerse4}`}
          textKor={`4. ${thoughtOnVerse4}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`5. ${thoughtOnVerse5}`}
          textKor={`5. ${thoughtOnVerse5}`}
          customStyles="break-words"
        />
      </div>


      <div className="flex flex-col pt-5 px-10 w-full">
        <Text
          type="p"
          textEng={`1. ${showThanks1}`}
          textKor={`1. ${showThanks1}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`2. ${showThanks2}`}
          textKor={`2. ${showThanks2}`}
          customStyles="mb-2 break-words"
        />
        <Text
          type="p"
          textEng={`3. ${showThanks3}`}
          textKor={`3. ${showThanks3}`}
          customStyles=" break-words"
        />
      </div>
    </div>
  );
};

export default PostInfoMobile;
