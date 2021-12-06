import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { languageState } from '../../pages/_app';

interface IText {
    type:"h1Extra"|"h1"| "h2" | "h3" | "h4" | "p" | "label" | "button" | "error"
    textEng?: string,
    textKor?: string,
    customStyles?: string
  }
const Text:React.FC<IText> = ({type, textEng, textKor, customStyles}) => {

  const [language, setLanguage] = useRecoilState(languageState)

    const styles = {
      h1Extra: 'font-sans text-6xl font-bold md:text-5xl xl:text-6xl',
        h1: 'font-sans text-4xl font-bold md:text-5xl xl:text-6xl',
        h2: 'font-sans text-3xl  font-bold',
        h3: `font-sans text-3xl md:text-2xl xl:text-4xl ${language && "leading-10 xl:leading-16"}`,
        h4: 'font-sans text-2xl',
        p: 'font-serif text-sm leading-6 xl:text-base xl:leading-7',
        label: 'font-sans text-xl xl:text-2xl',
        button: 'font-sans text-2xl',
        error: 'text-xs text-red-400',
      }


    return (
        <div className={`${styles[type]} ${customStyles}`}>
            {language ? textKor : textEng}
        </div>
    )
}

export default Text
