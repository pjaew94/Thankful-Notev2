import  jwt  from 'jsonwebtoken';
import  cookie  from 'cookie';
import { usersRepo } from './../../../helpers/api/userRepo';
import { groupRepo } from './../../../helpers/api/groupRepos';
import type { NextApiRequest, NextApiResponse } from "next";


import dotenv from 'dotenv';

dotenv.config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const {finder} = req.body

        // Check if group trying to join exists.
        const checkGroup = await groupRepo.groupExist(finder);
        if(!checkGroup) return res.status(404).json({eng: "The group ID you've entered does not match any groups. Please double check the ID you've entered.", kor: "입력한 그룹 ID와 일치하는 그룹이 없습니다. 입력하신 아이디를 다시 한번 확인해주세요."})
    
        const user = await usersRepo.createUser(req.body);

        if(user && process.env.JWTSECRET){
          const token = jwt.sign({ user: user.id }, process.env.JWTSECRET, {
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

            return res.send(user)
      }

      return res.status(404).json({eng: "There was an error with your request.", kor:"예러"})
      
    } catch (err) {
        res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
    }
  }