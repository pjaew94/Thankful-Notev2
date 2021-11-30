import { GetServerSideProps, NextPage } from "next"
import RequireAuthentication from "../../components/HOC/RequireAuthentication"
import { useRouter } from "next/dist/client/router";
import useSWR from "swr";
import { API_URL } from "../../helpers/url";
import { IGroupInfo, IUserInfo } from "../../types";
import useResponsive from "../../hooks/useResponsive";
import GroupMobile from "../../components/Group/Mobile/GroupMobile";
import GroupDesktop from "../../components/Group/Desktop/GroupDesktop";
import Loading from "../../components/Loading";

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
    })

interface IGroupPage {
    visitorInfo: IUserInfo
}

const GroupPage: NextPage<IGroupPage> = ({visitorInfo}) => {
    const router = useRouter();
    const { id } = router.query;

    const fetcher = (url: string) =>
    fetch(url, {
      method: "GET"
    }).then((res) => res.json());


    const { data, error } = useSWR<IGroupInfo>(
        `${API_URL}/api/group/${id}`,
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
      {responsive === "sm" || (responsive === "md" && data) ? (
        <GroupMobile groupInfo={data} visitorInfo={visitorInfo} />
      ) : (
        <GroupDesktop />
      )}
    </div>
}

export default GroupPage
