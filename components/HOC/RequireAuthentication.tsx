import next, { GetServerSideProps, GetServerSidePropsContext } from "next";
import cookie from 'cookie'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";



dotenv.config();


const RequireAuthentication = (gssp: GetServerSideProps) => {



  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const {token, userId} = cookie.parse(req.headers.cookie);
      
      if(token && process.env.JWTSECRET && !userId) {
        jwt.verify(token, process.env.JWTSECRET, (err, dec) => {
          if(err){
            return {
              redirect: {
                permanent: false,
                destination: '/login',
              },
            };
          } else {
            next;
          }
        })
      }



      if (!token) {
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
    return await gssp(ctx);
  };
};

export default RequireAuthentication;
