import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useState } from "react";
import { helperFunc } from "../../../helpers/helperFunc";
import useResponsive from "../../../hooks/useResponsive";
import Text from "../../Text";

interface IPostsList {
  author: string;
  createdAt: string;
  isPrivate: boolean;
  thoughtOnVerse1: string;
  thoughtOnVerse2: string;
  thoughtOnVerse3: string;
  thoughtOnVerse4: string;
  thoughtOnVerse5: string;
  showThanks1: string;
  showThanks2: string;
  showThanks3: string;
  msgId: number;
  id: number;
  bookEng: string | null;
  bookKor: string | null;
  msgEng: string;
  msgKor: string;
  chapAndVerse: string | null;
  authorUsername: string;
  visitorUsername: string;
}

const PostsList: React.FC<IPostsList> = ({
  id,
  authorUsername,
  msgId,
  createdAt,
  isPrivate,
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
  author,
  visitorUsername,
}) => {
  const responsive = useResponsive();
  const dateConverted = helperFunc.convertDate(createdAt);

  const [expand, setExpand] = useState(false);

  const clicked = () => {
    if (isPrivate) {
      if (authorUsername === visitorUsername) {
        setExpand(!expand);
      } else {
      }
    } else {
      setExpand(!expand);
    }
  };

  const shortenedThought = thoughtOnVerse1.slice(0, 20) + '...'

  const mobileList = (
    <motion.div
      className="flex flex-col gap-2 border border-black py-2 rounded-md mb-5"
      whileTap={{ scale: 0.98 }}
      onClick={() => clicked()}
    >
      {/* Show without expand */}
      <div
        className={`grid grid-cols-12 ${
          expand && "pb-2 border-b border-gray-200"
        }`}
      >
        <Text
          type="p"
          textEng={msgId.toString()}
          customStyles="col-span-3 text-center"
        />
        <Text
          type="p"
          textEng={dateConverted}
          customStyles="col-span-6 text-center"
        />
        <div className="col-span-3 h-full flex justify-center items-center">
          {isPrivate ? (
            <LockClosedIcon className="h-4 w-4" />
          ) : (
            <LockOpenIcon className="h-4 w-4 text-sunnyYellow" />
          )}
        </div>
      </div>
      <div className="flex justify-center px-6">
        <Text
          type="p"
          textEng={`By: ${
            visitorUsername === authorUsername ? "You" : authorUsername
          }`}
          customStyles="text-gray-400"
        />
      </div>

      {expand && (
        <div className="flex flex-col py-4">
          <Text
            type="p"
            textEng={msgEng}
            textKor={msgKor}
            customStyles="mb-3 px-6"
          />
          <div className="flex w-full justify-end text-gray-400 pb-5 px-6 border-b border-gray-200">
            {bookEng && bookKor && (
              <Text
                type="p"
                textEng={bookEng}
                textKor={bookKor}
                customStyles="mr-2"
              />
            )}
            {chapAndVerse && (
              <Text type="p" textEng={chapAndVerse} textKor={chapAndVerse} />
            )}
          </div>

          <div className="flex flex-col py-5 px-6 border-b border-gray-200">
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
              customStyles=" break-words"
            />
          </div>
          <div className="flex flex-col pt-5 px-6">
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
      )}
    </motion.div>
  );

  const desktopList = (
    <motion.div
      className="flex flex-col gap-2 border border-black py-2 rounded-md mb-5 cursor-pointer hover:border-transparent hover:ring hover:ring-sunnyYellow"
      whileTap={{ scale: 0.98 }}
      onClick={() => clicked()}
    >
       {/* Show without expand */}
       <div
        className={`grid grid-cols-12 gap-2 ${
          expand && "pb-2 border-b border-gray-200"
        }`}
      >
        <Text
          type="p"
          textEng={msgId.toString()}
          textKor={msgId.toString()}
          customStyles="col-span-2 text-center"
        />
        <Text
          type="p"
          textEng={author}
          textKor={author}
          customStyles="col-span-2 text-center"
        />
                <Text
          type="p"
          textEng={shortenedThought}
          textKor={shortenedThought}
          customStyles="col-span-3 text-center"
        />
        <Text
          type="p"
          textEng={dateConverted}
          customStyles="col-span-3 text-center"
        />
        <div className="col-span-2 h-full flex justify-center items-center">
          {isPrivate ? (
            <LockClosedIcon className="h-4 w-4" />
          ) : (
            <LockOpenIcon className="h-4 w-4 text-sunnyYellow" />
          )}
        </div>
      </div>



      {expand && (
        <div className="flex flex-col py-4">
          <Text
            type="p"
            textEng={msgEng}
            textKor={msgKor}
            customStyles="mb-3 px-36"
          />
          <div className="flex w-full justify-end text-gray-400 pb-5 border-b border-gray-200 px-36">
            {bookEng && bookKor && (
              <Text
                type="p"
                textEng={bookEng}
                textKor={bookKor}
                customStyles="mr-2"
              />
            )}
            {chapAndVerse && (
              <Text type="p" textEng={chapAndVerse} textKor={chapAndVerse} />
            )}
          </div>

          <div className="flex flex-col py-5 px-36 border-b border-gray-200">
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
          <div className="flex flex-col pt-5 px-36">
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
      )}
    </motion.div>
  );

  return responsive === "sm" || responsive === 'md' ? mobileList : desktopList;
};

export default PostsList;
