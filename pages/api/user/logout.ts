import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
  }
}
