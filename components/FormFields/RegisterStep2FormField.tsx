import { UseFormRegister } from "react-hook-form";
import { IRegisterStep2Form } from "../../types";
import Text from "../Text";


interface IRegisterStep2FormField {
  field: "email" | "username" | "password" | "repeatPassword";
  placeholder: string;
  errors?: string;
  errorMsg: string;
  register: UseFormRegister<IRegisterStep2Form>;
  customStyles?: string;
  inputType?: "password" | "number";
}

const RegisterStep2FormField: React.FC<IRegisterStep2FormField> = ({
  field,
  placeholder,
  errors,
  errorMsg,
  register,
  customStyles,
  inputType
}) => {


  return (
    <div className={`flex flex-col w-full ${customStyles}`}>
      {errors && <Text type="error" textEng={errors} textKor={errors} customStyles='mb-1' />}
      <input
        className="border-2 border-black rounded-xl px-5 py-4 font-serif text-sm bg-transparent text-black placeholder-black focus:border-transparent focus:ring-2 focus:ring-sunnyYellow focus:bg-white focus:outline-none"
        {...register(field, { required: errorMsg })}
        placeholder={placeholder}
        type={inputType}
      />
    </div>
  );
};

export default RegisterStep2FormField;
