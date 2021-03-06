import { GetServerSideProps, GetServerSidePropsContext } from "next";



const AlreadyAuthenticated = (gssp: GetServerSideProps) => {

  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      const token = req.cookies['token'];

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
