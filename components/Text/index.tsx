

interface IText {
    type:"h1Extra"|"h1"| "h2" | "h3" | "h4" | "p" | "label" | "button" | "error"
    textEng?: string,
    textKor?: string,
    customStyles?: string
  }
const Text:React.FC<IText> = ({type, textEng, textKor, customStyles}) => {

    const styles = {
      h1Extra: 'font-sans text-6xl font-bold md:text-5xl xl:text-6xl',
        h1: 'font-sans text-4xl font-bold md:text-5xl xl:text-6xl',
        h2: 'font-sans text-3xl  font-bold',
        h3: 'font-sans text-3xl md:text-2xl xl:text-4xl',
        h4: 'font-sans text-2xl',
        p: 'font-serif text-sm leading-6',
        label: 'font-sans text-xl',
        button: 'font-sans text-2xl',
        error: 'text-xs text-red-400',
        
      }


    return (
        <div className={`${styles[type]} ${customStyles}`}>
            {textEng}
        </div>
    )
}

export default Text
