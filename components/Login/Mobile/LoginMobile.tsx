import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "../../Buttons/Button";
import CustomLink from "../../Buttons/CustomLink";
import Text from "../../Text";
import ThankfulNoteUnderlined from "../../Text/ThankfulNoteUnderlined";
import LoginFormMobile from "./LoginFormMobile";
import { fadeUpVariant } from "./../../../motion/index";
import Toggle from "../../Language/Toggle";
import { languageState } from "../../../pages/_app";
import {useRecoilState} from 'recoil'

const LoginMobile: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [language, setLanguage] = useRecoilState(languageState)

  return (
    <div className={`flex relative w-full h-[812px] md:h-full md:min-h-[768px] items-center justify-center overflow-x-hidden`}
    >
      <LoginFormMobile setShowLoginForm={setShowLoginForm} showLoginForm={showLoginForm} />
      <div className='absolute top-10 right-10'>
        <Toggle />
      </div>
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
          <Text type="h1" textEng="Welcome To" textKor='감사노트에 오신' />
          {language && <Text type="h1" textEng="Joining us!" textKor='것을 환영합니다!' customStyles='mt-2' />}
          {!language && <div className="flex">
            <ThankfulNoteUnderlined />
            <Text type="h1" textEng="! " />
          </div>}

          <Text
            type="p"
            textEng="Let's take moment to gather your thoughts and focus on the fruits of your day. What were you thankful for today?"
            textKor='잠시 시간을 내어 생각을 정리하고 하루의 결실에 집중합시다. 오늘 무엇에 감사했습니까?'
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
            textKor="등록하기"
            primary={false}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginMobile;
