import AlreadyAuthenticated from "./../components/HOC/AlreadyAuthenticated";
import { NextPage, GetServerSideProps } from "next"
import axios from "axios";


export const getServerSideProps: GetServerSideProps = AlreadyAuthenticated(
    async (ctx) => {
      return {
        props: {},
      };
    }
  );



const Register: NextPage = ({}) => {

    const login = async () => {
        try {
          const body = { email: "pjaew94@gmail.com", password: "Wnstjd77" };
          await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
        } catch (err) {
          console.log("fuck");
        }
      };

      
const logout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/logout");
  
      console.log(res);
    } catch (err) {
      console.log("fuck");
    }
  };

    return (
        <div>
            <button onClick={() => login()}>LOGIN</button>
            <button onClick={() => logout()}>LOGOUT</button>
        </div>
    )
}

export default Register
