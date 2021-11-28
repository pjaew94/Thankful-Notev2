
import prisma from "../../lib/prisma";


const checkIfItHasBeenADay = async(userId: number) => {
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

    

    const now = new Date().toISOString
    const store = "2021-11-28 05:54:07.907"
    const store2 = "2021-11-28 01:59:25.986"
    

    const today = Date.UTC(2021, 11, 28, 5, 54, 7)
    const yesterday = Date.UTC(2021, 11, 27, 1, 59, 25)

    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = ((today - yesterday)/msPerDay)
    
}


export const helperFunctionRepo = {
    checkIfItHasBeenADay
}