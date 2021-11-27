import AlreadyAuthenticated from "./../components/HOC/AlreadyAuthenticated";
import { NextPage, GetServerSideProps } from "next"
import useResponsive from './../hooks/useResponsive';
import axios from "axios";
import RegisterMobile from './../components/Register/Mobile/RegisterMobile';
import RegisterDesktop from './../components/Register/Desktop/RegisterDesktop';


export const getServerSideProps: GetServerSideProps = AlreadyAuthenticated(
    async (ctx) => {
      return {
        props: {},
      };
    }
  );



const Register: NextPage = ({}) => {

   
  const responsive = useResponsive();

const logout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/logout");
  
      console.log(res);
    } catch (err) {
      console.log("fuck");
    }
  };

    return (
        <div className="h-screen w-screen">
        {responsive === "sm" || responsive ==="md" ? <RegisterMobile /> : <RegisterDesktop />}
    </div>
    )
}

export default Register
