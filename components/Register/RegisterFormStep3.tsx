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
import { languageState } from "../../pages/_app";
import {useRecoilState} from 'recoil'

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
  
  const [language, setLanguage] = useRecoilState(languageState)
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
        router.replace("/");
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
        router.replace("/");
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
      <Text type="h3" textEng="Last Step!" customStyles="mb-5" />
      <RegisterGroupToggle
        setJoinOrCreateGroup={setJoinOrCreateGroup}
        joinOrCreateGroup={joinOrCreateGroup}
      />
      {joinOrCreateGroup === "join" ? (
        <Text
          type="p"
          textEng="Joining a group helps keep each other accountable to be sure to give thanks everyday!"
          textKor="그룹에 가입하면 서로에게 매일 감사할 수 있는 책임을 지는 데 도움이 됩니다!"
          customStyles="mb-5 text-gray-400"
        />
      ) : (
        <Text
          type="p"
          textEng="Create your own group to start a community! I mean... someone has to start it."
          textKor="세로운 거뮤니티를 시작하시기를 원하십니까?"
          customStyles="mb-5 text-gray-400"
        />
      )}

      <RegisterStep3FormField
        field="finder"
        placeholder={language ? "고유한 그룹 ID":"Unique Group ID"}
        errors={errors?.finder && errors.finder.message}
        errorMsg={language ? "고유한 그룹 ID는 비워둘 수 없습니다. 이것은 다른 사람들이 당신의 그룹에 가입하는 데 필요합니다!":"Unique group ID cannot be blank. This is required for other people to join your group!"}
        register={register}
        customStyles="mb-5"
      />
      {joinOrCreateGroup === "create" && (
        <RegisterStep3FormField
          field="name"
          placeholder={language ? "그룹 이름":"Group Name"}
          errors={errors?.name && errors.name.message}
          errorMsg={language ? "그룹 이름을 선택하세요!":"Please select a name for your group!"}
          register={register}
          customStyles="mb-5"
        />
      )}

      <div className="w-full mt-auto flex flex-col items-center gap-3">
        <div className="flex mb-2">
          <Text
            type="p"
            textEng="Already a member?"
            textKor="이미 멤버이신가요?"
            customStyles="mr-2 text-black"
          />
          <Link href="/login">
            <a className="lg:hover:text-gray-400">
              <Text type="p" textEng="Sign In" textKor='로그인' customStyles="font-bold" />
            </a>
          </Link>
        </div>
        <div className="w-full mt-auto grid grid-cols-2 gap-3">
          <Button
            primary={true}
            textEng="Back"
            textKor='뒤로'
            formSubmit={false}
            onClick={() => setRegisterStep(2)}
          />
          <Button primary={false} textEng="Join!" textKor='가입!' formSubmit={true} />
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
