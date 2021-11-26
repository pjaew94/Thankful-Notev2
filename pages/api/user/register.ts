import type { NextApiRequest, NextApiResponse } from "next";
import { usersRepo } from './../../../helpers/api/userRepo';
import prisma from "./../../../lib/prisma";
import bcrypt from 'bcryptjs'
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, email, password } =
      req.body;

    // Validate email/username to be unique
    const checkUsername =await  usersRepo.checkUsername(username)
    const checkEmail = await usersRepo.checkEmail(email)
    if(checkUsername) return res.status(400).json({eng: 'The username already exists. Please choose a different username.', kor: '선택한 유저네임이 이미 존재합니다. 다른 유저네임이을 선택해주세요.'})
    if(checkEmail) return res.status(400).json({eng: "The email is already being used. Please choose a different email.",  kor: '이메일은 이미 사용 중입니다. 다른 이메일을 선택하세요.'})

    // Hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    req.body.password = bcryptPassword

     const response = await prisma.user.create({
      data: {
        ...req.body
      },
    });

    // Create token and set cookie for auth
    if(process.env.JWTSECRET){
        const token = jwt.sign({user: response.id}, process.env.JWTSECRET , {expiresIn: '1hr'})
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token",token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/"
            })
        ) 
    }

    res.status(200).send({success: true})

  } catch (err) {
    res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
  }
}
