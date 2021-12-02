import { UseFormRegister } from "react-hook-form";
import { IRegisterStep1Form } from "../../types";
import Text from "../Text";


interface IRegisterStep1FormField {
  field: "firstName" | "lastName" | "age";
  placeholder: string;
  errors?: string;
  errorMsg: string;
  register: UseFormRegister<IRegisterStep1Form>;
  customStyles?: string;
  inputType?: "password" | "number";
}

const RegisterStep1FormField: React.FC<IRegisterStep1FormField> = ({
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

export default RegisterStep1FormField;
