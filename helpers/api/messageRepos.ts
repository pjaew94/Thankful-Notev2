import prisma from "../../lib/prisma";
import { usersRepo } from "./userRepo";


const getTodaysMessage = async(userId: number) => {
    const user = await usersRepo.getFullInfo(userId)

    const message = await prisma.message.findFirst({
        where: {
            id: user?.currentDay
        }
    })

    return message
}

const createMessageBatch = async() => {
    const createMessages = await prisma.message.createMany({
        data: [
            
                {
                  msgEng:
                    "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
                  msgKor:
                    "항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라",
                  bookEng: "1 Thessalonians",
                  bookKor: "살전",
                  chapAndVerse: "5:16-18",
                },
                {
                  msgEng:
                    "For everything God created is good, and nothing is to be rejected if it is received with thanksgiving, because it is consecrated by the word of God and prayer.",
                  msgKor:
                    "하나님께서 지으신 모든 것이 선하매 감사함으로 받으면 버릴 것이 없나니 하나님의 말씀과 기도로 거룩하여짐이라",
                  bookEng: "1 Timothy",
                  bookKor: "딤전",
                  chapAndVerse: "4:4,5",
                },
                {
                  msgEng:
                    "When everything is falling down and when my heart is filled with resentment, force yourself to be thankful. The thanks you give today will give you strength tomorrow.",
                  msgKor:
                    "환경이 답답하고 감사가 나오지 않고 원망과 불평이 나올 때 당겨서 감사해보라. 오늘 드린 감사가 내일의 삶에 능력이 될 것이다",
                  bookEng: null,
                  bookKor: null,
                  chapAndVerse: null,
                },
                {
                  msgEng:
                    "Gratitude is training. Gratitude is what is learned through many trials, many pains, and constantly falling and getting back up.",
                  msgKor:
                    "감사는 훈련이다. 수많은 연단을 거치고 수많은 아픔을 거치고 넘어지고 깨지면서 습득되는 것이 감사이다.",
                  bookEng: null,
                  bookKor: null,
                  chapAndVerse: null,
                },
                {
                  msgEng:
                    "We always thank God, the Father of our Lord Jesus Christ, when we pray for you.",
                  msgKor:
                    "우리가 너희를 위하여 기도할 때마다 하나님 곧 우리 주 예수 그리스도의 아버지께 감사하노라",
                  bookEng: "Colossians",
                  bookKor: "골",
                  chapAndVerse: "1:3",
                },
              
        ]
    })


    return createMessages
}
export const messageRepos = {
    createMessageBatch,
    getTodaysMessage
}


