import RequireAuthentication from "./../components/HOC/RequireAuthentication";
import { NextPage, GetServerSideProps } from "next"
import useResponsive from "../hooks/useResponsive";
import HomeMobile from "../components/Home/Mobile/HomeMobile";
import HomeDesktop from "../components/Home/Desktop/HomeDesktop";
import cookie from 'cookie'
import { API_URL } from "../helpers/url";
import { IUserInfo } from "../types";



export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {
    const {req} = ctx

      const { userId } = cookie.parse(req.headers!.cookie!);
      const numberId = Number(userId)

      const response = await fetch(`${API_URL}/api/user/full-info`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({id: numberId})
      })

      
      const userInfo = await response.json();
    return {
      props: { userInfo },
    };
  }
);

interface IHome {
  userInfo: IUserInfo
}


const Home: NextPage<IHome> = ({userInfo}) => {
  const responsive = useResponsive()


  return (
    <div className='w-screen min-h-screen overflow-x-hidden'>
        {responsive === "sm" || responsive === "md" ? <HomeMobile /> : <HomeDesktop />}
    </div>
  )
}

export default Home
