import { UseFormRegister } from "react-hook-form";
import { ILoginForm, IPostForm } from "../../types";
import TextareaAutoSize from "react-textarea-autosize";


interface IPostFormField {
  field: "thoughtOnVerse1" | "thoughtOnVerse2" | "thoughtOnVerse3" | "thoughtOnVerse4" | "thoughtOnVerse5" | "showThanks1" | "showThanks2" | "showThanks3"
  placeholder: string;
  register: UseFormRegister<IPostForm>;
  customStyles?: string;

}

const PostFormField: React.FC<IPostFormField> = ({
  field,
  placeholder,
  register,
  customStyles,

}) => {
  return (
    <div className={`flex flex-col w-full ${customStyles}`}>
      <TextareaAutoSize
        className="border-b-2  border-b-black px-5 py-4 font-serif text-sm bg-transparent text-black placeholder-black focus:border-transparent focus:bg-yellow-100 focus:outline-none resize-none"
        {...register(field, { required: "You must fill all 5 fields!" })}
        placeholder={placeholder}
      
      />
    </div>
  );
};

export default PostFormField;
