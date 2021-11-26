import { GetServerSideProps, GetServerSidePropsContext } from "next";
import cookie from 'cookie'



const AlreadyAuthenticated = (gssp: GetServerSideProps) => {

  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const {token} = cookie.parse(req.headers.cookie);

      if (token) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
    } 
    return await gssp(ctx);
  };
};

export default AlreadyAuthenticated;
