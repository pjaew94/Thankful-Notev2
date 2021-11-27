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
    const { email, password } = req.body;

    // Check if valid Email
    const validateEmail = await usersRepo.validateEmail(email);
    if(!validateEmail) return res.status(400).json({eng: "The email you've entered is not a valid email.", kor: "입력하신 이메일은 유효한 이메일이 아닙니다."})

    // Check if email even exists
    const checkEmail = await usersRepo.checkEmail(email);
    if (checkEmail === false)
      return res
        .status(400)
        .json({
          eng: "User with the following email and password combination does not exist.",
          kor: "잘못된 자격 증명을 입력했습니다.",
        });

    // Check password
    const pw = await usersRepo.getPassword(email);
    const isCorrectPassword = await bcrypt.compare(password, pw);
    if (!isCorrectPassword)
      res
        .status(400)
        .json({
          eng: "User with the following email and password combination does not exist.",
          kor: "잘못된 자격 증명을 입력했습니다.",
        });

    // Create token and set cookie for auth
    const id = await usersRepo.getId(email);
    if (process.env.JWTSECRET) {
      const token = jwt.sign({ user: id }, process.env.JWTSECRET, {
        expiresIn: "1hr",
      });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).send({success: true})
    }
  } catch (err) {
    res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
  }
}
