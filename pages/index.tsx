import RequireAuthentication from "./../components/HOC/RequireAuthentication";
import { NextPage, GetServerSideProps } from "next"
import axios from "axios";



export const getServerSideProps: GetServerSideProps = RequireAuthentication(
  async (ctx) => {


     
    
    return {
      props: { },
    };
  }
);


interface Home {
  userId: number
}




const Home: NextPage<Home> = ({userId}) => {




 const logout = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/user/logout");

    console.log(res);
  } catch (err) {
    console.log("fuck");
  }
};


  return (
    <div >
        <button onClick={() => logout()}>
     

        </button>
    </div>
  )
}

export default Home
