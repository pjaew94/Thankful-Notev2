import Text from "../../Text";
import Link from "next/link";
import Button from "./../../Buttons/Button";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../../types";
import { useState } from "react";
import { IErrorState } from "./../../../types/index";
import { useRouter } from "next/dist/client/router";
import LoginFormField from "../../FormFields/LoginFormField";
import LoginErrorModal from "../Mobile/LoginErrorModal";
import { fadeUpVariant } from './../../../motion/index';
import Loading from "../../Loading";

const LoginFormDesktop: React.FC = () => {
  const [showLoginErrorModal, setShowLoginErrorModal] =
    useState<IErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
        "http://localhost:3000/api/user/login",
        JSON.stringify(data),
        config
      );

      router.push("/");
    } catch (err: any) {
      setShowLoginErrorModal(err.response.data);
      reset();
    }
    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-1/2 px-10 py-16 justify-center xl:py-20 2xl:px-[10%]"
      variants={fadeUpVariant}
      initial='initial'
      animate='animate'
      custom={0.6}
    >


      {showLoginErrorModal && (
        <LoginErrorModal
          showLoginErrorModal={showLoginErrorModal}
          setShowLoginErrorModal={setShowLoginErrorModal}
        />
      )}

{isLoading && <Loading />}
      <Text type="h1" textEng="Let's sign you in." customStyles="mb-5" />
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
        isPassword={true}
      />

      <div className="flex flex-col items-center mt-auto">
        <div className="flex ">
          <Text
            type="p"
            textEng="Don't have an account?"
            customStyles="mr-2 text-gray-400"
          />
          <Link href="/register">
            <a className='lg:hover:text-gray-400'>
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
    </motion.form>
  );
};

export default LoginFormDesktop;
