import { UseFormRegister } from "react-hook-form";
import { ILoginForm, IPostForm } from "../../types";
import Text from "../Text";

interface IPostFormField {
  field: "thoughtOnVerse1" | "thoughtOnVerse2" | "thoughtOnVerse3" | "thoughtOnVerse4" | "thoughtOnVerse5" | "showThanks1" | "showThanks2" | "showThanks3"
  placeholder: string;
  register: UseFormRegister<IPostForm>;
  customStyles?: string;
  inputType?: "password" | "number",
}

const PostFormField: React.FC<IPostFormField> = ({
  field,
  placeholder,
  register,
  customStyles,
  inputType,
}) => {
  return (
    <div className={`flex flex-col w-full ${customStyles}`}>
      <input
        className="border-b-2  border-b-black px-5 py-4 font-serif text-sm bg-transparent text-black placeholder-black focus:border-transparent focus:bg-yellow-100 focus:outline-none"
        {...register(field, { required: "You must fill all 5 fields!" })}
        placeholder={placeholder}
        type={inputType}
      />
    </div>
  );
};

export default PostFormField;
