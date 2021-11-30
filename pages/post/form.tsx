
import { GetServerSideProps, NextPage } from "next"
import RequireAuthentication from "../../components/HOC/RequireAuthentication";
import PostFormDesktop from "../../components/Post/Desktop/PostFormDesktop";
import PostFormMobile from "../../components/Post/Mobile/PostFormMobile";
import { API_URL } from "../../helpers/url";

import useResponsive from "../../hooks/useResponsive";
import { IMessage } from "../../types";



export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {
    const { req } = ctx;
    const userId = req.cookies["userId"];
    const response = await fetch(`${API_URL}/api/message/get-todays`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(userId) }),
    })

    const todaysMessage = await response.json();


    return {
      props: {todaysMessage, userId: Number(userId)},
    };
  }
)

interface IPostFormPage {
  todaysMessage: IMessage
  userId: number
}




const PostFormPage: NextPage<IPostFormPage> = ({todaysMessage, userId}) => {

    const responsive = useResponsive();
    return (
        <div className='min-h-screen w-screen'>
    {responsive === "sm" || responsive === "md" ? (
        <PostFormMobile todaysMessage={todaysMessage} userId={userId} />
      ) : (
        <PostFormDesktop />
      )}
        </div>

        
    )
}

export default PostFormPage
