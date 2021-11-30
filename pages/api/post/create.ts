import { postRepo } from './../../../helpers/api/postRepo';
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { usersRepo } from '../../../helpers/api/userRepo';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const post = await postRepo.createPost(req.body);
        const incrementUser = await usersRepo.updateUserCurrentDay(req.body.userId, req.body.msgId)

        res.status(200).send(post)
    } catch (err) {
        res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
    }

  }