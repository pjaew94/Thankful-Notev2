import type { NextApiRequest, NextApiResponse } from "next";
import { usersRepo } from "../../../helpers/api/userRepo";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const id = await usersRepo.getId(email);

    if(id){
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("userId", id.toString(), {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
    
          return res.status(200).send({success: true})
    }

    return res.status(404).send({success: false})

  } catch (err) {
    res.status(500).send({ eng: "Server Error", kor: "서버 예러" });

  }
}
