
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import RequireAuthentication from "../../../components/HOC/RequireAuthentication";
import Loading from "../../../components/Loading";
import UserPostsDesktop from "../../../components/User/Desktop/UserPostsDesktop";
import UserPostsMobile from "../../../components/User/Mobile/UserPostsMobile";
import { API_URL } from "../../../helpers/url";
import useResponsive from "../../../hooks/useResponsive";
import { IUserInfo } from "../../../types";

export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {
    const { req } = ctx;
    const userId = req.cookies["userId"];
    const user = await fetch(`${API_URL}/api/user/full-info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(userId) }),
    });
    const visitorInfo = await user.json();
    return {
      props: { visitorInfo},
    };
  }
);

interface IUserPosts {
    visitorInfo: IUserInfo
}

const UserPosts: NextPage<IUserPosts> = ({visitorInfo}) => {
  const router = useRouter();
  const { username } = router.query;

  const fetcher = (url: string) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    }).then((res) => res.json());

  const { data, error } = useSWR<IUserInfo>(
    `${API_URL}/api/user/${username}`,
    fetcher
  );

  const responsive = useResponsive();

    if(error){
        return <div>oopsies</div>
    }
    if(!data) {
        return <div>-<Loading /></div>
    }
    return <div className="w-screen min-h-screen overflow-x-hidden">
      {responsive === "sm" || responsive === "md" ? (
        <UserPostsMobile userInfo={data} visitorInfo={visitorInfo} />
      ) : (
        <UserPostsDesktop userInfo={data} visitorInfo={visitorInfo} />
      )}
    </div>
  
};

export default UserPosts;
