import { usersRepo } from './../../../helpers/api/userRepo';

import type { NextApiRequest, NextApiResponse } from 'next'





export default async function handler ( req: NextApiRequest,
    res: NextApiResponse){
        try {
            let user;

                user = await usersRepo.getFullInfo(req.body.id)

            if(!user) {
                return res.status(400).json({eng: "The user does not exist.", kor: "사용자가 존재하지 않습니다."})
            } else {
                return res.status(200).send(user)
            }




        } catch (err) {
            res.status(500).send({eng: 'Server Error', kor:'서버 예러'})
        }
}