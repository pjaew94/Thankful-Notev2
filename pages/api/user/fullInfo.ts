
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from './../../../lib/prisma';





export default async function handler ( req: NextApiRequest,
    res: NextApiResponse){
        try {
        
            const user = await prisma.user.findUnique({
                where: {
                    username: req.body.username
                },
                select: {
                    password: false,
                    posts: false
                }
            })

            if(!user) {
                return res.status(400).json({eng: "The user does not exist.", kor: "사용자가 존재하지 않습니다."})
            } else {
                return res.status(200).send(user)
            }



        } catch (err) {
            res.status(500).send({eng: 'Server Error', kor:'서버 예러'})
        }
}