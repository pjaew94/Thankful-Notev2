import Text from "./index";
import Image from "next/image";

const ThankfulNoteUnderlined: React.FC = () => {
  return (
    <div className="relative">
      <Text type="h1" textEng="Thankful Notes"  />
      <div className="w-full absolute -bottom-3">
        <Image
          src="/underlineYellow.svg"
          height="10%"
          width="100%"
          layout="responsive"
          objectFit="contain"
          priority={true}
          alt="dude"
        />
      </div>
    </div>
  );
};

export default ThankfulNoteUnderlined;
