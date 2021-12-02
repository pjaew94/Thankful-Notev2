import { Dispatch, SetStateAction } from "react";
import Text from "../Text";
import { Switch } from "@headlessui/react";

interface IPostFormPrivateToggle {
    isPrivate: boolean;
    setIsPrivate: Dispatch<SetStateAction<boolean>>;
  }


export const PostFormPrivateToggle: React.FC<IPostFormPrivateToggle> = ({
    setIsPrivate,
    isPrivate,
  }) => {
    return (
      <div className="flex flex-col w-full mt-10">
        <div className="flex items-center mb-2">
          <Text type="h4" textEng="Private" textKor="사적" customStyles="mr-6" />
          <Switch
            checked={isPrivate}
            onChange={setIsPrivate}
            className={`${
              isPrivate ? "bg-black" : "bg-gray-400"
            } relative inline-flex items-center h-6 rounded-full w-11 mr-6`}
          >
            <span className="sr-only">Set Private</span>
            <span
              className={`${
                isPrivate ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition duration-500 ease-in-out`}
            />
          </Switch>
          {isPrivate ? <Text type='h4' textEng='On' textKor='On' /> : <Text type='h4' textEng='Off' textKor='Off' />}
        </div>
        <Text
          type="p"
          textEng="Toggling this will allow only you to see the content of the post."
          textKor="토글하면 이 게시물은 개인만 볼수있습니다."
          customStyles="text-gray-400 w-10/12"
        />
      </div>
    );
  };

export default PostFormPrivateToggle