import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUpQuickVariant } from "../motion";
import Text from "../components/Text";
import LogoLink from "../components/Buttons/LogoLink";
import Button from "../components/Buttons/Button";
import RegisterForm from "../components/Register/RegisterForm";
import { GetServerSideProps } from "next";
import AlreadyAuthenticated from "../components/HOC/AlreadyAuthenticated";
import Toggle from "../components/Language/Toggle";


export const getServerSideProps: GetServerSideProps = AlreadyAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

const RegisterMobile: React.FC = () => {
  const [showRegisterMobileForm, setShowRegisterMobileForm] = useState(false);

  return (
    <div className="w-screen h-screen relative overflow-x-hidden">
      <div
        className={`flex relative h-[812px] md:h-full md:min-h-[768px]  pb-10 overflow-x-hidden items-center justify-center xl:h-full xl:pb-0 w-screen bg-sunnyYellow "`}
      >
        <RegisterForm
          setShowRegisterMobileForm={setShowRegisterMobileForm}
          showRegisterMobileForm={showRegisterMobileForm}
        />

        <div className="absolute top-10 left-10">
          <LogoLink />
        </div>
        <div className="absolute top-12 right-10">
          <Toggle />
        </div>

        <motion.div
          className="flex flex-col  items-center px-10 pt-24 pb-24 w-full h-full md:p-48  lg:h-full lg:w-[40%] lg:px-0 lg:pt-16 lg:pb-24 xl:w-[30%]"
          variants={fadeUpQuickVariant}
          initial="initial"
          animate="animate"
          custom={0.2}
        >
          {/* Image */}
          <div className="w-9/12 md:w-9/12 lg:w-9/12">
            <Image
              src="/register.png"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              priority={true}
              alt="dude"
            />
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col items-center mt-5 md:mb-16 lg:mb-6">
            <Text type="h1" textEng="Glad You're" textKor='??????????????? ??????' />
            <Text type="h1" textEng="Joining us!" textKor='?????? ???????????????!' />

            <Text
              type="p"
              textEng="Thankful notes helps all of us to take a step back and recognize the good in our lives. Ready to get started?"
              textKor='??????????????? ?????? ????????? ??? ??? ???????????? ?????? ?????? ?????? ?????? ???????????? ??? ????????? ?????????. ??????????????????????'
              customStyles="text-center mt-5 lg:w-9/12"
            />
          </div>

          <div className="flex flex-col items-center w-full mt-auto">
            <div className="flex ">
              <Text
                type="p"
                textEng="Already a member?"
                textKor="?????? ???????????????????"
                customStyles="mr-2 text-black"
              />
              <Link href="/login">
                <a className="lg:hover:text-gray-400">
                  <Text type="p" textEng="Sign In" textKor='?????????' customStyles="font-bold" />
                </a>
              </Link>
            </div>
            <Button
              onClick={() => setShowRegisterMobileForm(true)}
              primary={true}
              textEng="Start!"
              textKor="??????!"
              formSubmit={false}
              customStyles="mt-3"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterMobile;
