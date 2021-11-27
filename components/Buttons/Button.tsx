import { motion } from "framer-motion";
import Text from "../Text";

interface IButton {
  onClick?: () => void;
  primary: boolean;
  textEng: string;
  textKor?: string;
  customStyles?: string;
  disabled?: boolean;
  formSubmit?: boolean;
}

const Button: React.FC<IButton> = ({
  onClick,
  primary,
  textEng,
  textKor,
  customStyles,
  disabled,
  formSubmit,
}) => {

  const onClickFunc = () => {
    if(onClick){
      onClick()
    }
  }
  
  return (
    <motion.button
      disabled={disabled}
      type={formSubmit ? "submit" : undefined}
      className={`w-full flex justify-center items-center py-3 rounded-xl transition-all duration-200 ease-in-out  lg:hover:shadow-xl lg:hover:scale-105 ${
        primary ? "bg-black text-gray-100" : "bg-sunnyYellow text-black"
      } ${customStyles}`}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClickFunc()}
    >
      <Text type="button" textEng={textEng} textKor={textKor} />
    </motion.button>
  );
};

export default Button;
