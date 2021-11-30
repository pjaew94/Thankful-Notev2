import { ICreatePostData } from "./../../types/index";
import { helperFunc } from "./../helperFunc";

import prisma from "../../lib/prisma";

const checkIfPostedToday = async (userId: number) => {
  const mostRecentPostDate = await prisma.post.findFirst({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      createdAt: true,
    },
  });
  if (mostRecentPostDate?.createdAt) {
    const postedToday = await helperFunc.checkToday(
      mostRecentPostDate?.createdAt
    );
    return postedToday;
  } else {
    return false;
  }
};

const createPost = async (formData: ICreatePostData) => {
  const {
    thoughtOnVerse1,
    thoughtOnVerse2,
    thoughtOnVerse3,
    thoughtOnVerse4,
    thoughtOnVerse5,
    showThanks1,
    showThanks2,
    showThanks3,
    isPrivate,
    msgId,
    userId
  } = formData;

  const post = await prisma.post.create({
    data: {
      thoughtOnVerse1,
      thoughtOnVerse5,
      thoughtOnVerse4,
      thoughtOnVerse3,
      thoughtOnVerse2,
      showThanks3,
      showThanks2,
      showThanks1,
      isPrivate,
      author: {
          connect: {id: userId}
      },
      msg: {
        connect: {id: msgId}
      }
    },
  });

  return post
};

export const postRepo = {
  checkIfPostedToday,
  createPost
};
