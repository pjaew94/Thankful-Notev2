import { Switch } from "@headlessui/react"
import { languageState } from "../../pages/_app"
import Text from "../Text"
import {useRecoilState} from 'recoil'
import { useEffect } from "react"




const Toggle:React.FC = () => {

    const [language, setLanguage] = useRecoilState(languageState)

    useEffect(() => {
      const currLanguage = localStorage.getItem("language")
      if(currLanguage){
        setLanguage(currLanguage === "false" ? false : true)
      } else {
        setLanguage(false)
      }
      
    }, [language])

      const toggled = () => {
        if(language) {
          localStorage.setItem("language", "false")
          setLanguage(false)
          return false
        } else {
          localStorage.setItem("language", "true")
          setLanguage(true)
          return true
        }
      }


    return (
        <div className="flex flex-col justify-center">
        <div className="flex items-center">
          <Text type="p" textEng="Eng" textKor="Eng" customStyles={!language ? "text-black font-bold" : "text-gray-400"} />
          <Switch
            checked={language}
            onChange={toggled}
            className={`
              bg-black
             relative inline-flex items-center h-6 rounded-full w-11 mx-4`}
          >
            <span className="sr-only">Set Private</span>
            <span
              className={`${
                language ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition duration-500 ease-in-out`}
            />
          </Switch>
          <Text type='p' textEng='Kor' textKor='Kor' customStyles={language ? "text-black font-bold" : "text-gray-400"} />
        </div>
      </div>
    )
}

export default Toggle
