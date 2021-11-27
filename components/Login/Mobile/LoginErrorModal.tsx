import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Text from "../../Text";
import Button from "../../Buttons/Button";
import { motion } from "framer-motion";
import { fadeUpVariant } from "./../../../motion/index";
import { IErrorState } from "./../../../types/index";

interface ILoginErrorModal {
  setShowLoginErrorModal: Dispatch<SetStateAction<IErrorState | null>>;
  showLoginErrorModal: IErrorState | null;
}

const LoginErrorModal: React.FC<ILoginErrorModal> = ({
  setShowLoginErrorModal,
  showLoginErrorModal,
}) => {
  return (
    <div className="flex justify-center items-center absolute right-0 top-0 w-screen h-screen z-50">
      {/* Backdrop */}
      <div
        className="h-full w-full fixed bg-black bg-opacity-80 "
        onClick={() => setShowLoginErrorModal(null)}
      />
      {/* Content */}
      <motion.div
        className="flex flex-col w-10/12 items-center py-10 px-10 bg-gray-100 z-50 rounded-xl md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-3/12"
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
      >
        <div className="w-8/12 mb-5">
          <Image
            src="/error.png"
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
          textEng={showLoginErrorModal?.eng}
          textKor={showLoginErrorModal?.eng}
          customStyles="mb-10 text-center"
        />
        <Button
          onClick={() => setShowLoginErrorModal(null)}
          primary={true}
          textEng="Try Again"
        />
      </motion.div>
    </div>
  );
};

export default LoginErrorModal;
