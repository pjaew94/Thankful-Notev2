import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

        const result = await prisma.message.create({
            data: {
            msgEng: "Message",
            msgKor: "메세지",
            bookEng: "Book",
            bookKor: "북",
            chapAndVerse: "Yes"
            }
        })

        res.json(result)

   
    
  }