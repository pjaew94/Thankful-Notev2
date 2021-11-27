import Text from "../Text/index";
import Image from "next/image";
import Link from "next/link";

const TNUnderlined: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <div className="relative cursor-pointer lg:hover:scale-110">
          <div className='font-sans text-4xl font-bold'>t.n</div>
          <div className="w-full absolute -bottom-2">
            <Image
              src="/underlineBlack2.svg"
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

export default TNUnderlined;
