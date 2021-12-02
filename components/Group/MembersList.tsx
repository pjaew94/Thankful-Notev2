import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { helperFunc } from "../../helpers/helperFunc";
import useResponsive from "../../hooks/useResponsive";
import Text from "../Text";

interface IMembersList {
  username: string;
  firstName: string;
  lastName: string;
  currentDay: number;
  createdAt: string;
  visitorUsername: string;
}

const MembersList: React.FC<IMembersList> = ({
  username,
  firstName,
  lastName,
  currentDay,
  createdAt,
  visitorUsername,
}) => {
  const responsive = useResponsive();
  const dateConverted = helperFunc.convertDate(createdAt);
  const router = useRouter();

  const userClicked = () => {
    router.push(`/user/${username}/posts`);
  };

  const mobileList = (
    <motion.div
      className="flex flex-col gap-2 border border-black py-2 rounded-md mb-5"
      onClick={() => userClicked()}
      whileTap={{ scale: 0.98 }}
    >
      {/* Show without expand */}
      <div className="grid grid-cols-12 ">
        <Text
          type="p"
          textEng={`${firstName} ${lastName}`}
          customStyles="col-span-6 text-center"
        />
        <Text
          type="p"
          textEng={dateConverted}
          customStyles="col-span-6 text-center"
        />
      </div>
      {visitorUsername !== username && (
        <div className="flex px-6 justify-center">
          <Text type="p" textEng={username} customStyles="text-gray-400" />
        </div>
      )}
    </motion.div>
  );

  const desktopList = (
    <motion.div
      className="flex flex-col gap-2 border border-black py-2 rounded-md mb-5 cursor-pointer hover:border-transparent hover:ring hover:ring-sunnyYellow"
      onClick={() => userClicked()}
      whileTap={{ scale: 0.98 }}
    >
      {/* Show without expand */}
      <div className="grid grid-cols-12 ">
        <Text
          type="p"
          textEng={`${firstName} ${lastName}`}
          customStyles="col-span-3 text-center"
        />
        <Text
          type="p"
          textEng={username}
          customStyles="col-span-3 text-center"
        />
        <Text
          type="p"
          textEng={dateConverted}
          customStyles="col-span-3 text-center"
        />
        <Text
          type="p"
          textEng={(currentDay - 1).toString()}
          textKor={(currentDay - 1).toString()}
          customStyles="col-span-3 text-center"
        />
      </div>
    </motion.div>
  );
  return responsive === "sm" || responsive === "md" ? mobileList : desktopList;
};

export default MembersList;
