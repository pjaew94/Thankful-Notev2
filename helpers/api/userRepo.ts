import { groupRepo } from './groupRepos';
import { IRegisterData } from './../../types/index';
import  bcrypt  from 'bcryptjs';
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
    const configEmail = email.toLowerCase().trim()

    const user = await prisma.user.findUnique({
        where: {
            email: configEmail
        }
    })
    if(!user) {
        return false
    } else {
        return true
    }
}

const getPassword = async (email: string): Promise<string> => {
    const configEmail = email.toLowerCase().trim()
    const user = await prisma.user.findUnique({
        where: {
            email: configEmail
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
    const configEmail = email.toLowerCase().trim()
    const user = await prisma.user.findUnique({
        where: {
            email: configEmail
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

const validateEmail = async(email: string) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email.toLowerCase().trim());
}



const validatePassword = async(password: string) => {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/
    return regexp.test(password)
}

const hashPassword = async (password: string) => {
        // Hash password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        return bcryptPassword
}

const createUser = async (data: IRegisterData) => {
    const {
        firstName,
        lastName,
        age,
        email,
        username,
        password,
        finder
      } = data;

      const hashedPassword = await hashPassword(password);
      const numberAge = Number(age);

      const user = await prisma.user.create({
          data: {
              firstName,
              lastName,
              age: numberAge,
              email,
              username,
              password: hashedPassword,
                group: {
                    connect: { finder }
                }
          }
      })

      return user;
}

const getFullInfo = async(userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            posts: true
        }
    })

    return user
}

const getFullInfoUsername = async(username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        include: {
            posts: {
                include: {
                    author : {
                        select: {
                            firstName: true,
                            username: true
                        }
                    },
                    msg: {
                        select: {
                            bookEng: true,
                            bookKor: true,
                            msgEng: true,
                            msgKor: true,
                            chapAndVerse: true,


                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            }
        },
        
    })

    return user
}


const updateUserCurrentDay = async(userId: number, msgId: number) => {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            currentDay: msgId + 1,
            // updatedAt: new Date(new Date().toISOString())
        }
    })

    return user
}


const homeInfoOnly = async(userId: number) => {
    const homeInfo = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            group: {
                select: {
                    createdAt: true,
                    name: true,
                    posts: {
                        select: {
                            id: true
                        }
                    }
                }
            },
            posts: {
                select: {
                    id: true
                }
            }
        }
    })
    return homeInfo
}



export const usersRepo = {
    checkUsername,
    checkEmail,
    getPassword,
    getId,
    validateEmail,
    validatePassword,
    hashPassword,
    createUser,
    getFullInfo,
    updateUserCurrentDay,
    getFullInfoUsername,
    homeInfoOnly
}