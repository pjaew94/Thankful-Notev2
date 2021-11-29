import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Button from "../Buttons/Button";
import RegisterStep2FormField from "../FormFields/RegisterStep2FormField";
import Loading from "../Loading";
import Text from "../Text";
import {
  IErrorState,
  IRegisterData,
  IRegisterStep3Form,
} from "./../../types/index";
import { motion } from "framer-motion";
import { fadeUpQuickVariant } from "./../../motion/index";
import LoginErrorModal from "../Modals/ErrorModals";
import axios from "axios";
import { API_URL } from "../../helpers/url";
import RegisterGroupToggle from "./IRegisterGroupToggle";
import RegisterStep3FormField from "../FormFields/RegisterStep3FormField";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import useDeviceHeight from "../../hooks/useDeviceHeight";

interface IRegisterFormStep3 {
  setRegisterStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setData: Dispatch<SetStateAction<IRegisterData>>;
  data: IRegisterData;
}

const RegisterFormStep3: React.FC<IRegisterFormStep3> = ({
  setRegisterStep,
  setData,
  data,
}) => {
  const deviceHeight = useDeviceHeight();
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState<IErrorState | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [joinOrCreateGroup, setJoinOrCreateGroup] = useState<"join" | "create">(
    "join"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRegisterStep3Form>();

  useEffect(() => {
    if (data.finder && data.name) {
      setValue("finder", data.finder);
      setValue("name", data.name);
    }
  }, []);

  const onSubmit = async (formData: IRegisterStep3Form) => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { finder, name } = formData;
      const deliverData = { ...data, finder, name };

      if (joinOrCreateGroup == "join") {
        const res = await axios.post(
          `${API_URL}/api/group/join-group`,
          JSON.stringify(deliverData),
          config
        );
        await axios.post(
          `${API_URL}/api/user/set-id-header`,
          JSON.stringify(data),
          config
        );
        router.push("/");
      } else {
        const res = await axios.post(
          `${API_URL}/api/group/create-group`,
          JSON.stringify(deliverData),
          config
        );
        await axios.post(
          `${API_URL}/api/user/set-id-header`,
          JSON.stringify(data),
          config
        );
        router.push("/");
      }
    } catch (err: any) {
      setShowErrorModal(err.response.data);
    }

    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex ${deviceHeight} flex-col md:h-[600px] md:w-[400px]`}
      variants={fadeUpQuickVariant}
      initial="initial"
      animate="animate"
    >
      <Text type="h3" textEng="Last Step!" customStyles="mb-5" />
      <RegisterGroupToggle
        setJoinOrCreateGroup={setJoinOrCreateGroup}
        joinOrCreateGroup={joinOrCreateGroup}
      />
      {joinOrCreateGroup === "join" ? (
        <Text
          type="p"
          textEng="Joining a group helps keep each other accountable to be sure to give thanks everyday!"
          customStyles="mb-5 text-gray-400"
        />
      ) : (
        <Text
          type="p"
          textEng="Create your own group to start a community! I mean... someone has to start it."
          customStyles="mb-5 text-gray-400"
        />
      )}

      <RegisterStep3FormField
        field="finder"
        placeholder="Unique Group ID"
        errors={errors?.finder && errors.finder.message}
        errorMsg="Unique group ID cannot be blank. This is required for other people to join your group!"
        register={register}
        customStyles="mb-5"
      />
      {joinOrCreateGroup === "create" && (
        <RegisterStep3FormField
          field="name"
          placeholder="Group Name"
          errors={errors?.name && errors.name.message}
          errorMsg="Please select a name for your group!"
          register={register}
          customStyles="mb-5"
        />
      )}

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
            onClick={() => setRegisterStep(2)}
          />
          <Button primary={false} textEng="Join!" formSubmit={true} />
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

export default RegisterFormStep3;
