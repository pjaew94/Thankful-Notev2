import  cookie  from 'cookie';
import  jwt  from 'jsonwebtoken';
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

        // Make sure the group finder doesn't already exist for another group.
        const checkGroup = await groupRepo.groupExist(finder);
        if(checkGroup) return res.status(404).json({eng: "The group unique ID already exists for another group. Please choose a different unique ID.", kor: "다른 그룹에 대한 그룹 고유 ID가 이미 있습니다. 다른 고유 ID를 선택하세요."})

        
        const group = await groupRepo.createGroupAndUser(req.body)

        if(group && process.env.JWTSECRET){
            const token = jwt.sign({ user: group.users[0].id }, process.env.JWTSECRET, {
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

              return res.send(group)
        }

        return res.status(404).json({eng: "There was an error with your request.", kor:"예러"})

      } catch (err) {
        res.status(500).send(err)
        res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
      }
  }