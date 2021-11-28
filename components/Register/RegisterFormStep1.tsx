import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Button from "../Buttons/Button";
import RegisterStep1FormField from "../FormFields/RegisterStep1FormField";
import Loading from "../Loading";
import Text from "../Text";
import { IRegisterData, IRegisterStep1Form } from "./../../types/index";
import { motion } from "framer-motion";
import { fadeUpQuickVariant } from "./../../motion/index";
import Link from "next/link";

interface IRegisterFormStep1 {
  setRegisterStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setData: Dispatch<SetStateAction<IRegisterData>>;
  data: IRegisterData;
}

const RegisterFormStep1: React.FC<IRegisterFormStep1> = ({
  setRegisterStep,
  setData,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRegisterStep1Form>();

  useEffect(() => {
    if (data.firstName && data.lastName && data.age) {
      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("age", data.age);
    }
  }, []);

  const onSubmit = async (formData: IRegisterStep1Form) => {
    setIsLoading(true);
    const { firstName, lastName, age } = formData;
    setData({ ...data, firstName, lastName, age });
    setIsLoading(false);
    setRegisterStep(2);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full md:h-[600px] md:w-[400px]"
      variants={fadeUpQuickVariant}
      initial="initial"
      animate="animate"
    >
      <Text type="h3" textEng="Let's start easy." customStyles="mb-10" />
      <RegisterStep1FormField
        field="firstName"
        placeholder="First Name"
        errors={errors?.firstName && errors.firstName.message}
        errorMsg="Please include your first name."
        register={register}
        customStyles="mb-5"
      />
      <RegisterStep1FormField
        field="lastName"
        placeholder="Last Name"
        errors={errors?.lastName && errors.lastName.message}
        errorMsg="Please include your last name."
        register={register}
        customStyles="mb-5"
      />
      <RegisterStep1FormField
        field="age"
        placeholder="Age"
        errors={errors?.age && errors.age.message}
        errorMsg="Please include your age."
        register={register}
        customStyles="mb-5"
        inputType="number"
      />

      <div className="flex flex-col items-center w-full mt-auto">
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
        <Button primary={false} textEng="Next" formSubmit={true} />
      </div>

      {isLoading && <Loading />}
    </motion.form>
  );
};

export default RegisterFormStep1;
