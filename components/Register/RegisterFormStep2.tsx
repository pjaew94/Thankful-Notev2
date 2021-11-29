import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Button from "../Buttons/Button";
import RegisterStep2FormField from "../FormFields/RegisterStep2FormField";
import Loading from "../Loading";
import Text from "../Text";
import {
  IErrorState,
  IRegisterData,
  IRegisterStep2Form,
} from "./../../types/index";
import { motion } from "framer-motion";
import { fadeUpQuickVariant } from "./../../motion/index";
import LoginErrorModal from "../Modals/ErrorModals";
import axios from "axios";
import { API_URL } from "../../helpers/url";
import Link from "next/link";
import useDeviceHeight from "../../hooks/useDeviceHeight";

interface IRegisterFormStep2 {
  setRegisterStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setData: Dispatch<SetStateAction<IRegisterData>>;
  data: IRegisterData;
}

const RegisterFormStep2: React.FC<IRegisterFormStep2> = ({
  setRegisterStep,
  setData,
  data,
}) => {
  const deviceHeight = useDeviceHeight();
  const [showErrorModal, setShowErrorModal] = useState<IErrorState | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRegisterStep2Form>();

  useEffect(() => {
    if (data.email && data.username) {
      setValue("email", data.email);
      setValue("username", data.username);
    }
  }, []);

  const onSubmit = async (formData: IRegisterStep2Form) => {
    setIsLoading(true);
    try {
      const { email, username, password, repeatPassword } = formData;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${API_URL}/api/user/register-checkpoint-2`,
        JSON.stringify(formData),
        config
      );

      if (res.data.success === true) {
        setData({ ...data, email, username, password, repeatPassword });
        setRegisterStep(3);
      }
    } catch (err: any) {
      setShowErrorModal(err.response.data);
    }

    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full flex-col md:w-[400px]`}
      variants={fadeUpQuickVariant}
      initial="initial"
      animate="animate"
    >
      <Text type="h3" textEng="Getting spicy." customStyles="mb-10" />
      <RegisterStep2FormField
        field="email"
        placeholder="Email"
        errors={errors?.email && errors.email.message}
        errorMsg="Please enter your email."
        register={register}
        customStyles="mb-5"
      />
      <RegisterStep2FormField
        field="username"
        placeholder="Username"
        errors={errors?.username && errors.username.message}
        errorMsg="Please select a unique username."
        register={register}
        customStyles="mb-5"
      />
      <RegisterStep2FormField
        field="password"
        placeholder="Password"
        errors={errors?.password && errors.password.message}
        errorMsg="Please select a password."
        register={register}
        customStyles="mb-5"
        inputType="password"
      />
      <RegisterStep2FormField
        field="repeatPassword"
        placeholder="Repeat Password"
        errors={errors?.repeatPassword && errors.repeatPassword.message}
        errorMsg="Make sure the two passwords are matching."
        register={register}
        customStyles="mb-5"
        inputType="password"
      />

      <div className="w-full mt-auto flex flex-col items-center gap-3">
        <div className="flex mb-2">
          <Text
            type="p"
            textEng="Already a member?"
            customStyles="mr-2 text-black"
          />
          <Link href="/login">
            <a className="lg:hover:text-gray-400">
              <Text type="p" textEng="Sign In" customStyles="font-bold" />
            </a>
          </Link>
        </div>
        <div className="w-full mt-auto grid grid-cols-2 gap-3">
          <Button
            primary={true}
            textEng="Back"
            formSubmit={false}
            onClick={() => setRegisterStep(1)}
          />
          <Button primary={false} textEng="Next" formSubmit={true} />
        </div>
      </div>

      {isLoading && <Loading />}
      {showErrorModal && (
        <LoginErrorModal
          setShowErrorModal={setShowErrorModal}
          showErrorModal={showErrorModal}
        />
      )}
    </motion.form>
  );
};

export default RegisterFormStep2;
