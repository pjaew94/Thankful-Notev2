

interface IText {
    type:"h1"| "h2" | "h3" | "h4" | "p" | "label"
    textEng?: string,
    textKor?: string,
    customStyles?: string
  }
const Text:React.FC<IText> = ({type, textEng, textKor, customStyles}) => {

    const styles = {
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        p: '',
        label: ''
      }


    return (
        <div className={`${styles[type]}`}>
            {textEng}
        </div>
    )
}

export default Text
