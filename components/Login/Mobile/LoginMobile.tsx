import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "../../Buttons/Button";
import CustomLink from "../../Buttons/CustomLink";
import Text from "../../Text";
import ThankfulNoteUnderlined from "../../Text/ThankfulNoteUnderlined";
import LoginFormMobile from "./LoginFormMobile";
import { fadeUpVariant } from "./../../../motion/index";
import useDeviceHeight from "../../../hooks/useDeviceHeight";


const LoginMobile: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const deviceHeight = useDeviceHeight()

  return (
    <div className={`flex relative w-full h-[812px] md:h-full md:min-h-[768px] items-center justify-center overflow-x-hidden`}
    >
      <LoginFormMobile setShowLoginForm={setShowLoginForm} showLoginForm={showLoginForm} />

      <motion.div
        className={`flex flex-col w-full h-full items-center px-10 pt-16 pb-24  md:p-48 `}
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
      >
        {/* Image */}
        <div className="w-3/4">
          <Image
            src="/groupImg.png"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            priority={true}
            alt="dude"
          />
        </div>

        {/* Welcome Text */}
        <div className="flex flex-col items-center mt-5 mb-16">
          <Text type="h1" textEng="Welcome To" />
          <div className="flex">
            <ThankfulNoteUnderlined />
            <Text type="h1" textEng="! " />
          </div>

          <Text
            type="p"
            textEng="Let's take moment to gather your thoughts and focus on the fruits of your day. What were you thankful for today?"
            customStyles="text-center mt-5 text-gray-400"
          />
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col mt-auto">
          <Button
            onClick={() => setShowLoginForm(true)}
            textEng="Sign In"
            textKor="로그인"
            primary={true}
            customStyles="mb-5"
          />
          <CustomLink
            route="/register"
            textEng="Register"
            textKor="로그인"
            primary={false}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginMobile;
