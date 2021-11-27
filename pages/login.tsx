import axios from "axios";
import { NextPage, GetServerSideProps } from "next";
import { useEffect } from "react";
import Text from "../components/Text";
import AlreadyAuthenticated from "./../components/HOC/AlreadyAuthenticated";
import useResponsive from './../hooks/useResponsive';
import LoginMobile from './../components/Login/Mobile/LoginMobile';
import LoginDesktop from "../components/Login/Desktop/LoginDesktop";

export const getServerSideProps: GetServerSideProps = AlreadyAuthenticated(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

// const login = async () => {
//   try {
//     const body = { email: "pjaew94@gmail.com", password: "Wnstjd77" };
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const res = await axios.post('http://localhost:3000/api/user/login', JSON.stringify(body), config)
    

//     console.log(res);
//   } catch (err) {
//     console.log("fuck");
//   }
// };

// const logout = async () => {
//   try {
//     const res = await axios.post("http://localhost:3000/api/user/logout");

//     console.log(res);
//   } catch (err) {
//     console.log("fuck");
//   }
// };

interface IText {
  type:"h1"| "h2" | "h3" | "h4" | "p" | "label"
  textEng?: string,
  textKor?: string,
  customStyles?: string
}

const Login: NextPage<IText> = () => {

  const responsive = useResponsive();

  return (
    <div className="h-screen w-screen">
        {responsive === "sm" || responsive ==="md" ? <LoginMobile /> : <LoginDesktop />}
    </div>
  );
};

export default Login;
