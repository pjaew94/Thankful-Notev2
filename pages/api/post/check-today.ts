import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const data = await prisma.user.findMany({
          where: {
            createdAt: {
              gte: new Date("2021-11-28"),
              lt: new Date("2021-11-29")
            }
          }
        })

        return res.status(200).send(data)
    } catch (err) {
      res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
    }
  }