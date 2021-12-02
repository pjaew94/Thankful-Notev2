import { motion } from "framer-motion";
import Image from "next/image";
import LogoLink from "../../Buttons/LogoLink";
import Toggle from "../../Language/Toggle";
import { fadeUpVariant } from './../../../motion/index';

const LoginDeskTopDisplay: React.FC = () => {
  return (
    <motion.div className="relative w-1/2 h-full bg-sunnyYellow rounded-3xl flex items-center justify-center"
      variants={fadeUpVariant}
      initial='initial'
      animate='animate'
      custom={0.2}
    >
      <div className="absolute top-10 left-10">
        <LogoLink />
      </div>

      <div className='flex absolute top-16 right-10'>
      <Toggle />

      </div>

      <div className="w-9/12 mb-5 transition-all duration-200  lg:hover:rotate-6">
        <Image
          src="/groupImg.png"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
          priority={true}
          alt="dude"
        />
      </div>
    </motion.div>
  );
};

export default LoginDeskTopDisplay;
