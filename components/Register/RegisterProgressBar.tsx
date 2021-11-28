import { Dispatch, SetStateAction } from "react"
import Text from "../Text"


interface IRegisterProgressBar {
    registerStep: 1 | 2 | 3
    setRegisterStep: Dispatch<SetStateAction<1 | 2 | 3>>
}


const RegisterProgressBar:React.FC<IRegisterProgressBar> = ({registerStep, setRegisterStep}) => {
    return (
        <div className="w-full grid grid-cols-3 gap-2 my-10 md:w-[400px]">
      <div className="flex flex-col" >
        <Text
          type="p"
          textEng="1. Basic Info"
          textKor="1. 기본 정보"
          customStyles={registerStep >= 1 ? "text-black" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            registerStep >= 1 ? "bg-sunnyYellow" : "bg-gray-300"
          }`}
        />
      </div>
      <div className="flex flex-col" >
        <Text
          type="p"
          textEng="2. Auth"
          textKor="2. 인증"
          customStyles={registerStep >= 2 ? "text-black" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            registerStep >= 2 ? "bg-sunnyYellow" : "bg-gray-300"
          }`}
        />
      </div>

      <div className="flex flex-col">
        <Text
          type="p"
          textEng="3. Group"
          textKor="3. 그룹"
          customStyles={registerStep === 3 ? "text-black" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            registerStep === 3 ? "bg-sunnyYellow" : "bg-gray-300"
          }`}
        />
      </div>
    </div>
    )
}

export default RegisterProgressBar
