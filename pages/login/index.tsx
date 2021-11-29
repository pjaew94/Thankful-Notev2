import { NextPage, GetServerSideProps } from "next";
import AlreadyAuthenticated from "../../components/HOC/AlreadyAuthenticated";
import useResponsive from '../../hooks/useResponsive';
import LoginMobile from '../../components/Login/Mobile/LoginMobile';
import LoginDesktop from "../../components/Login/Desktop/LoginDesktop";

export const getServerSideProps: GetServerSideProps = AlreadyAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  }
);


const Login: NextPage = () => {

  const responsive = useResponsive();

  return (
    <div className="h-screen w-screen">
        {responsive === "sm" || responsive ==="md" ? <LoginMobile /> : <LoginDesktop />}
    </div>
  );
};

export default Login;
