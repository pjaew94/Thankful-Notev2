import { motion } from "framer-motion";
import Text from "../Text";
import Link from 'next/link'

interface ICustomLink {
  route: string,
  primary: boolean;
  textEng: string;
  textKor?: string;
  customStyles?: string;
  disabled?: boolean;
  children?: React.ReactNode
}


const CustomLink: React.FC<ICustomLink> = ({
  route,
  primary,
  textEng,
  textKor,
  customStyles,
  disabled,
  children
}) => {
  return <motion.div className={`w-full flex justify-center items-center py-3 rounded-xl transition-all duration-100 ease-in-out cursor-pointer lg:hover:shadow-xl lg:hover:scale-105 ${primary ? "bg-black text-gray-100" : "bg-sunnyYellow text-black"} ${customStyles}`}
    whileTap={{scale: 0.98}}
  >
      <Link href={route}>
           <a><Text type='button' textEng={textEng} textKor={textKor} />
            {children}
           </a>
      </Link>
  </motion.div>;
};

export default CustomLink;
