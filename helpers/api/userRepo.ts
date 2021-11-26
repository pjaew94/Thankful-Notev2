import prisma from '../../lib/prisma';

const checkUsername = async(username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if(!user) {
        return false
    } else {
        return true
    }
}

const checkEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user) {
        return false
    } else {
        return true
    }
}

const getPassword = async (email: string): Promise<string> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            password: true
        }
    })
    if(user){
    return user.password
    } else {
        return ''
    }
}

const getId = async(email: string): Promise<number | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true
        }
    })

    if(user){
        return user.id
    } else {
        return null
    }
}








export const usersRepo = {
    checkUsername,
    checkEmail,
    getPassword,
    getId
}