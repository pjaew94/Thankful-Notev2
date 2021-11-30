import { postRepo } from './../../../helpers/api/postRepo';
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const {userId} = req.body
        const response = await postRepo.checkIfPostedToday(userId);

        return res.status(200).send(response)

    } catch (err) {
      res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
    }
  }