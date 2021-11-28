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
      <div className="flex w-screen relative h-screen items-center justify-center overflow-hidden bg-sunnyYellow">
        <RegisterForm
          setShowRegisterMobileForm={setShowRegisterMobileForm}
          showRegisterMobileForm={showRegisterMobileForm}
        />
  
        <div className="absolute top-10 left-10">
          <LogoLink />
        </div>
        <motion.div
          className="flex flex-col items-center px-10 py-16 h-full justify-center md:h-[600px] md:w-[400px] lg:h-full lg:w-[40%] md:py-16 md:px-0 xl:w-[30%]"
          variants={fadeUpQuickVariant}
          initial="initial"
          animate="animate"
          custom={0.2}
        >
          {/* Image */}
          <div className="w-full lg:w-9/12">
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
          <div className="flex flex-col items-center mt-5 mb-16">
            <Text type="h1" textEng="Glad You're" />
            <Text type="h1" textEng="Joining us!" />
  
            <Text
              type="p"
              textEng="Thankful notes helps all of us to take a step back and recognize the good in our lives. Ready to get started?"
              customStyles="text-center mt-5 lg:w-9/12"
            />
          </div>
  
          <div className="flex flex-col items-center w-full mt-10">
            <div className="flex ">
              <Text
                type="p"
                textEng="Already a member?"
                customStyles="mr-2 text-black"
              />
              <Link href="/login">
                <a className='lg:hover:text-gray-400'>
                  <Text type="p" textEng="Sign In" customStyles="font-bold" />
                </a>
              </Link>
            </div>
            <Button
              onClick={() => setShowRegisterMobileForm(true)}
              primary={true}
              textEng="Start!"
              formSubmit={false}
              customStyles="mt-3"
            />
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default RegisterMobile;
