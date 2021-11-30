import { messageRepos } from './../../../helpers/api/messageRepos';
import { usersRepo } from './../../../helpers/api/userRepo';
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const todaysMessage = await messageRepos.getTodaysMessage(req.body.id);

        res.status(200).send(todaysMessage)

    } catch (err) {
        res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
    }
  }