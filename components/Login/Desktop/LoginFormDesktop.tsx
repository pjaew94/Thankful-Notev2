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
import ErrorModal from "../../Modals/ErrorModals";
import { fadeUpVariant } from "./../../../motion/index";
import Loading from "../../Loading";
import { API_URL } from './../../../helpers/url';
import { languageState } from "../../../pages/_app";
import {useRecoilState} from 'recoil'
import Toggle from "../../Language/Toggle";

const LoginFormDesktop: React.FC = () => {
  const [showErrorModal, setShowErrorModal] =
    useState<IErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useRecoilState(languageState)
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
        `${API_URL}/api/user/login`,
        JSON.stringify(data),
        config
      );
      await axios.post(
        `${API_URL}/api/user/set-id-header`,
        JSON.stringify(data),
        config
      );


      router.push('/')
    } catch (err: any) {
      setShowErrorModal(err.response.data);
      reset();
    }
    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col w-1/2 px-10 py-16 justify-center xl:py-20 2xl:px-[10%]"
      variants={fadeUpVariant}
      initial="initial"
      animate="animate"
      custom={0.6}
    >
      {showErrorModal && (
        <ErrorModal
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
        />
      )}

      {isLoading && <Loading />}
      <Text type="h1" textEng="Let's sign you in."           textKor="로그인" customStyles="mb-5" />
      <Text type="h3" textEng="Welcome back."textKor='다시 오신 것을' customStyles="text-gray-400" />
      <Text
        type="h3"
        textEng="You've been missed!"
        textKor=' 환영합니다.'
        customStyles="text-gray-400 mb-20"
      />

<LoginFormField
          field="email"
          placeholder={language ? "이메일":"Email"}
          errors={errors?.email && errors.email.message}
          errorMsg={language ? "이메일을 포함하세요.":"Please include your email."}
          register={register}
          customStyles="mb-5"
        />
    <LoginFormField
          field="password"
          placeholder={language ? "비밀번호" :"Password"}
          errors={errors?.password && errors.password.message}
          errorMsg={language ? "비밀번호를 입력하세요.":"Please include your password."}
          register={register}
          inputType='password'
        />

      <div className="flex flex-col items-center mt-auto">
        <div className="flex ">
          <Text
            type="p"
            textEng="Don't have an account?"
            textKor='아직 멤버가 아닌가요?'
            customStyles="mr-2 text-gray-400"
          />
          <Link href="/register">
            <a className="lg:hover:text-gray-400">
              <Text type="p" textEng="Register" textKor='등록하기' customStyles="font-bold" />
            </a>
          </Link>
        </div>
        <Button
          primary={true}
          textEng="Sign In"
          textKor='로그인'
          formSubmit={true}
          customStyles="mt-3"
          disabled={isLoading}
        />
      </div>
    </motion.form>
  );
};

export default LoginFormDesktop;
