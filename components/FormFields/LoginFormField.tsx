import { UseFormRegister } from "react-hook-form";
import { ILoginForm } from "../../types";
import Text from "../Text";

interface ILoginFormField {
  field: "email" | "password";
  placeholder: string;
  errors?: string;
  errorMsg: string;
  register: UseFormRegister<ILoginForm>;
  customStyles?: string;
  isPassword?: boolean
}

const LoginFormField: React.FC<ILoginFormField> = ({
  field,
  placeholder,
  errors,
  errorMsg,
  register,
  customStyles,
  isPassword
}) => {
  return (
    <div className={`flex flex-col w-full ${customStyles}`}>
      {errors && <Text type="error" textEng={errors} customStyles='mb-1' />}
      <input
        className="border-2 border-black rounded-xl px-5 py-4 font-serif text-sm bg-transparent text-black placeholder-black focus:border-transparent focus:ring-2 focus:ring-sunnyYellow focus:bg-white focus:outline-none"
        {...register(field, { required: errorMsg })}
        placeholder={placeholder}
        type={isPassword ? "password" : undefined}
      />
    </div>
  );
};

export default LoginFormField;
