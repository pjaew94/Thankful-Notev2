import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
      const result = await prisma.group.create({
          data: {
            name: "Jesus Love Church",
            finder: "JLC",
            users: {connect: {}}
          }
      })

      res.json(result)
  } catch (err) {
    res.status(500).send({ eng: "Server Error", kor: "서버 예러" });
  }
}
