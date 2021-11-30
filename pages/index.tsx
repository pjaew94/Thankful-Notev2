import RequireAuthentication from "./../components/HOC/RequireAuthentication";
import { NextPage, GetServerSideProps } from "next";
import useResponsive from "../hooks/useResponsive";
import HomeMobile from "../components/Home/Mobile/HomeMobile";
import HomeDesktop from "../components/Home/Desktop/HomeDesktop";
import { API_URL } from "../helpers/url";
import { IUserInfo } from "../types";

export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {
    const { req } = ctx;
    const userId = req.cookies["userId"];
    const user = await fetch(`${API_URL}/api/user/full-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(userId) }),
    });
    const checkTodayCall = await fetch(`${API_URL}/api/post/check-today`)
    

    const userInfo = await user.json();
    const hasPostedToday = await checkTodayCall.json();

    return {
      props: { userInfo, hasPostedToday },
    };
  }
);

interface IHome {
  userInfo: IUserInfo;
  hasPostedToday: boolean
}

const Home: NextPage<IHome> = ({ userInfo, hasPostedToday }) => {

  const responsive = useResponsive();

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">

      {responsive === "sm" || responsive === "md" ? (
        <HomeMobile userInfo={userInfo} hasPostedToday={hasPostedToday} />
      ) : (
        <HomeDesktop />
      )}
    </div>
  );
};

export default Home;
