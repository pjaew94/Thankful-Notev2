import { GetServerSideProps, GetServerSidePropsContext } from "next";
import cookie from 'cookie'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";



dotenv.config();


const RequireAuthentication = (gssp: GetServerSideProps) => {



  return async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;

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
            return res.setHeader(
              "Set-Cookie",
              cookie.serialize("userId", dec!.user, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
              })
            );

           
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
