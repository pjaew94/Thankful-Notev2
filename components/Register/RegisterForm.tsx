import { useState } from "react";

import { IErrorState, IRegisterData } from "../../types/index";
import { motion } from "framer-motion";
import { ReplyIcon } from "@heroicons/react/outline";
import RegisterProgressBar from "./RegisterProgressBar";
import RegisterFormStep1 from "./RegisterFormStep1";
import RegisterFormStep2 from "./RegisterFormStep2";
import RegisterFormStep3 from "./RegisterFormStep3";
import useResponsive from "../../hooks/useResponsive";
import LogoLink from "../Buttons/LogoLink";
import useDeviceHeight from "../../hooks/useDeviceHeight";

interface IRegisterForm {
  showRegisterMobileForm: boolean;
  setShowRegisterMobileForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<IRegisterForm> = ({
  showRegisterMobileForm,
  setShowRegisterMobileForm,
}) => {
  const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<IRegisterData>({
    firstName: "",
    lastName: "",
    age: 0,
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    finder: "",
    name: "",
  });

  const responsive = useResponsive();
  const deviceHeight = useDeviceHeight();

  return (
    <div
      className={` flex flex-col px-10 pt-16 pb-24 fixed top-0 w-full h-full bg-gray-100 z-10 transition-all duration-500 ease-in-out md:py-36 md:justify-center md:items-center lg:pt-16 lg:pb-24 xl:pb-36 xl:pt-28 ${
        showRegisterMobileForm ? "left-0" : "left-full"
      }`}
    >
      {}
      {responsive === "sm" || responsive === "md" ? (
        <div className="md:absolute md:left-10 md:top-10">
          <motion.button
            onClick={() => setShowRegisterMobileForm(false)}
            whileTap={{ scale: 0.95 }}
          >
            <ReplyIcon className="h-7 w-7" />
          </motion.button>
        </div>
      ) : <div className='absolute left-10 top-16'>
          <LogoLink />
        </div>}


      <RegisterProgressBar
        setRegisterStep={setRegisterStep}
        registerStep={registerStep}
      />

      {registerStep === 1 ? (
        <RegisterFormStep1
          setRegisterStep={setRegisterStep}
          setData={setData}
          data={data}
        />
      ) : registerStep === 2 ? (
        <RegisterFormStep2
          setRegisterStep={setRegisterStep}
          setData={setData}
          data={data}
        />
      ) : (
        <RegisterFormStep3
          setRegisterStep={setRegisterStep}
          setData={setData}
          data={data}
        />
      )}
    </div>
  );
};

export default RegisterForm;
