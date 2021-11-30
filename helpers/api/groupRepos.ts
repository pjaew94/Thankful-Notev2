import { usersRepo } from './userRepo';
import { IRegisterData } from "./../../types/index";
import prisma from "../../lib/prisma";

const groupExist = async (finder: string) => {
  const group = await prisma.group.findUnique({
    where: {
      finder: finder,
    }
  });
  if (!group) {
    return false;
  } else {
    return group;
  }
};

const createGroupAndUser = async (data: IRegisterData) => {
        const {
            firstName,
            lastName,
            age,
            email,
            username,
            password,
            finder,
            name,
          } = data;
        
          const hashedPassword = await usersRepo.hashPassword(password);
          const numberAge = Number(age)
        
          const res = await prisma.group.create({
            data: {
              finder: finder,
              name: name,
              users: {
                create: [
                  {
                    firstName,
                    lastName,
                    age: numberAge,
                    email,
                    username,
                    password: hashedPassword,

                  },
                ],
              },
            },
            include: {
                users: true
            }
          });
        
          return res;
  
};

const getFullInfo = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId
    },
    include: {
      users: true,
      posts: true
    }
  })

  return group
}

export const groupRepo = {
  groupExist,
  createGroupAndUser,
  getFullInfo
};
