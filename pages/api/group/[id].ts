import { groupRepo } from './../../../helpers/api/groupRepos';
import { usersRepo } from './../../../helpers/api/userRepo';

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';





export default async function handler ( req: NextApiRequest,
    res: NextApiResponse){
        try {
                const {id } = req.query


                const group = await groupRepo.getFullInfo(Number(id));

                res.status(200).send(group)



            
        } catch (err) {
            res.status(500).send({eng: 'Server Error', kor:'서버 예러'})
        }
    }