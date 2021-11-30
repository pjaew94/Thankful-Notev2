import { helperFunc } from './../helperFunc';

import prisma from "../../lib/prisma";


const checkIfPostedToday = async(userId: number) => {
    const mostRecentPostDate = await prisma.post.findFirst({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            createdAt: true
        }
    })
    if(mostRecentPostDate?.createdAt){
        const postedToday = await helperFunc.checkToday(mostRecentPostDate?.createdAt)
        return postedToday
    } else {
        return false
    }
}


export const postRepo = {
    checkIfPostedToday
}