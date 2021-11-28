import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "../../Buttons/Button";
import CustomLink from "../../Buttons/CustomLink";
import Text from "../../Text";
import ThankfulNoteUnderlined from "../../Text/ThankfulNoteUnderlined";
import LoginFormMobile from "./LoginFormMobile";
import { fadeUpVariant } from "./../../../motion/index";


const LoginMobile: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className="flex relative w-full h-full items-center justify-center overflow-x-hidden">
      <LoginFormMobile
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />

      <motion.div
        className="flex flex-col h-full items-center px-10 py-16 md:h-[800px] md:w-[400px] md:p-0"
        variants={fadeUpVariant}
        initial="initial"
        animate="animate"
      >
        {/* Image */}
        <div className="w-full">
          <Image
            src="/landingImg.png"
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
