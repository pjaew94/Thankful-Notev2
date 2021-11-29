import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Text from "../Text";
import { fadeUpQuickVariant } from "../../motion";
import Button from "../Buttons/Button";
import axios from "axios";
import { API_URL } from "../../helpers/url";
import { useRouter } from "next/dist/client/router";


interface ILogoutModal {
  setShowLogoutModal: Dispatch<SetStateAction<boolean>>;
}

const LogoutModal: React.FC<ILogoutModal> = ({ setShowLogoutModal }) => {

    const router = useRouter();

    const logOut = async() => {
        await axios.get(`${API_URL}/api/user/logout`);
        await axios.get(`${API_URL}/api/user/remove-user`);
        router.push('/login')
    }


  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen z-50">
      {/* Backdrop */}
      <div
        className="h-full w-full fixed bg-black bg-opacity-60 "
        onClick={() => setShowLogoutModal(false)}
      />

      <motion.div
        className="flex flex-col w-10/12 items-center py-10 px-10 bg-gray-100 z-50 rounded-xl md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-3/12"
        variants={fadeUpQuickVariant}
        initial="initial"
        animate="animate"
      >
        <div className="w-8/12 mb-5">
          <Image
            src="/logout.png"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            priority={true}
            alt="dude"
          />
        </div>

        <Text
          type="p"
          textEng='Are you sure you want to head out?'
          customStyles="mb-10 text-center"
        />
        <div className='w-full grid grid-cols-2 gap-3'>
        <Button
          onClick={() => setShowLogoutModal(false)}
          primary={false}
          textEng="Stay"
        />
        <Button
          onClick={() => logOut()}
          primary={true}
          textEng="Leave"
        />


        </div>
      </motion.div>
    </div>
  );
};

export default LogoutModal;
