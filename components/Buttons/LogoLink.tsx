
import Image from "next/image";
import Link from "next/link";

interface ILogoLink {
  yellow?: boolean
}
const LogoLink: React.FC<ILogoLink> = ({yellow}) => {
  return (
    <Link href="/">
      <a>
        <div className="relative cursor-pointer lg:hover:scale-110">
          <div className={`font-sans text-4xl font-bold z-50 lg:text-5xl`}>t.n</div>
          <div className="w-full absolute -bottom-3 z-0 lg:w-7/12">
            <Image
              src={yellow ? "/underlineYellow2.svg" :  "/underlineBlack2.svg"}
              height="50%"
              width="100%"
              layout="responsive"
              objectFit="contain"
              priority={true}
              alt="dude"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LogoLink;
