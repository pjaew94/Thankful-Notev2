import { usersRepo } from './../../../helpers/api/userRepo';

import type { NextApiRequest, NextApiResponse } from 'next'





export default async function handler ( req: NextApiRequest,
    res: NextApiResponse){
        try {
            const homeInfo = await usersRepo.homeInfoOnly(req.body.id);

            res.status(200).send(homeInfo)
            
        } catch (err) {
            res.status(500).send({eng: 'Server Error', kor:'서버 예러'})
        }

    }