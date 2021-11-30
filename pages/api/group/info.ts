import { groupRepo } from './../../../helpers/api/groupRepos';
import { usersRepo } from './../../../helpers/api/userRepo';

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';





export default async function handler ( req: NextApiRequest,
    res: NextApiResponse){
        try {
            const user = await usersRepo.getFullInfo(req.body.id);
            if(user?.groupId){
                const group = await groupRepo.getFullInfo(user?.groupId);

                res.status(200).send(group)
            } else {
                res.status(404).json({success: false})
            }


            
        } catch (err) {
            res.status(500).send({eng: 'Server Error', kor:'서버 예러'})
        }
    }