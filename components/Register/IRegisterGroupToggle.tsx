import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Text from "../Text";

interface IRegisterGroupToggle {
  setJoinOrCreateGroup: Dispatch<SetStateAction<"join" | "create">>;
  joinOrCreateGroup: "join" | "create";
}

const RegisterGroupToggle: React.FC<IRegisterGroupToggle> = ({
  setJoinOrCreateGroup,
  joinOrCreateGroup,
}) => {
  return (
    <motion.div className="relative flex w-full bg-gray-200 rounded-2xl mb-5 lg:hover:shadow-xl">
      <motion.button
      type="button"
        className={`w-1/2 rounded-2xl py-4 font-bold ${
          joinOrCreateGroup === "join" && "bg-black text-white"
        }`}
        onClick={() => setJoinOrCreateGroup("join")}
        whileTap={{scale: 0.95}}
      >
        <Text type="label" textEng="Join" textKor='가입하기' />
      </motion.button>
      <motion.button
      type="button"
        className={`w-1/2 rounded-2xl py-4 font-bold ${
          joinOrCreateGroup === "create" && "bg-black text-white"
        }`}
        onClick={() => setJoinOrCreateGroup("create")}
        whileTap={{scale: 0.95}}
      >
        <Text type="label" textEng="Create" textKor='만들기' />
      </motion.button>
    </motion.div>
  );
};


export default RegisterGroupToggle;
