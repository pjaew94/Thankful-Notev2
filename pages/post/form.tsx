import { NextPage } from "next"
import PostFormDesktop from "../../components/Post/Desktop/PostFormDesktop";
import PostFormMobile from "../../components/Post/Mobile/PostFormMobile";
import useResponsive from "../../hooks/useResponsive";




const PostFormPage: NextPage = () => {

    const responsive = useResponsive();
    return (
        <div className='min-h-screen w-screen'>
    {responsive === "sm" || responsive === "md" ? (
        <PostFormMobile />
      ) : (
        <PostFormDesktop />
      )}
        </div>
    )
}

export default PostFormPage
