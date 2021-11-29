import { ReplyIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../../types";
import LoginFormField from "../../FormFields/LoginFormField";
import Text from "../../Text";
import Link from "next/link";
import Button from "./../../Buttons/Button";
import axios from "axios";
import { useState } from "react";
import LoginErrorModal from "../../Modals/ErrorModals";
import { useRouter } from "next/dist/client/router";
import Loading from "./../../Loading/index";
import { IErrorState } from "./../../../types/index";
import { API_URL } from "./../../../helpers/url";
import useDeviceHeight from "../../../hooks/useDeviceHeight";

interface ILoginFormMobile {
  showLoginForm: boolean;
  setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoginFormMobile: React.FC<ILoginFormMobile> = ({
  showLoginForm,
  setShowLoginForm,
}) => {
  const router = useRouter();


  const [showErrorModal, setShowErrorModal] =
    useState<IErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${API_URL}/api/user/login`,
        JSON.stringify(data),
        config
      );
      await axios.post(
        `${API_URL}/api/user/set-id-header`,
        JSON.stringify(data),
        config
      );
        router.reload();
    } catch (err: any) {
      setShowErrorModal(err.response.data);
      reset();
    }
    setIsLoading(false);
  };


  return (
    <div
      className={`flex flex-col px-10 pt-16 pb-24 absolute top-0 w-full h-full bg-gray-100 z-10 transition-all duration-500 ease-in-out md:justify-center md:items-center  ${
        showLoginForm ? "left-0" : "left-full"
      }`}
    >
       <div className="md:absolute left-10 top-10">
        <motion.button
          onClick={() => setShowLoginForm(false)}
          whileTap={{ scale: 0.95 }}
        >
          <ReplyIcon className="h-7 w-7" />
        </motion.button>
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full w-full md:py-32 md:px-44"
      >
        <Text
          type="h1"
          textEng="Let's sign you in."
          customStyles="mt-10 mb-2"
        />
        <Text type="h3" textEng="Welcome back." customStyles="text-gray-400" />
        <Text
          type="h3"
          textEng="You've been missed!"
          customStyles="text-gray-400 mb-20"
        />
        <LoginFormField
          field="email"
          placeholder="Email"
          errors={errors?.email && errors.email.message}
          errorMsg="Please include your email."
          register={register}
          customStyles="mb-5"
        />
        <LoginFormField
          field="password"
          placeholder="Password"
          errors={errors?.password && errors.password.message}
          errorMsg="Please include your password."
          register={register}
          inputType='password'
        />

        <div className="flex flex-col items-center mt-auto">
          <div className="flex ">
            <Text
              type="p"
              textEng="Don't have an account?"
              customStyles="mr-2 text-gray-400"
            />
            <Link href="/register">
              <a>
                <Text type="p" textEng="Register" customStyles="font-bold" />
              </a>
            </Link>
          </div>
          <Button
            primary={true}
            textEng="Sign In"
            formSubmit={true}
            customStyles="mt-3"
            disabled={isLoading}
          />
        </div>
      </form>

      {showErrorModal && (
        <LoginErrorModal
          setShowErrorModal={setShowErrorModal}
          showErrorModal={showErrorModal}
        />
      )}
      {isLoading && <Loading />}
      {/* Back Button Line */}
    </div>
  );
};

export default LoginFormMobile;
