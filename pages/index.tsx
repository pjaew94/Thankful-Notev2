import RequireAuthentication from "./../components/HOC/RequireAuthentication";
import { NextPage, GetServerSideProps } from "next";
import useResponsive from "../hooks/useResponsive";
import HomeMobile from "../components/Home/Mobile/HomeMobile";
import { API_URL } from "../helpers/url";
import { IGroupInfo, IHomeInfo, IUserInfo } from "../types";
import HomeDesktop from "../components/Home/Desktop/HomeDesktop";

export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {
    const { req } = ctx;
    const userId = req.cookies["userId"];
    const home = await fetch(`${API_URL}/api/user/home-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(userId) }),
    });
  

    const homeInfo = await home.json();

  

    return {
      props: { homeInfo },
    };
  }
);

interface IHome {
  homeInfo: IHomeInfo
  
}

const Home: NextPage<IHome> = ({ homeInfo}) => {

  const responsive = useResponsive();
  

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      {responsive === "sm" || responsive === "md" ? (
        <HomeMobile homeInfo={homeInfo} />
      ) : (
        <HomeDesktop homeInfo={homeInfo} />
      )}
    </div>
  );
};

export default Home;
