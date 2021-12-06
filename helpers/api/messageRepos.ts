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
                    "I will bless the Lord at all times: his praise shall continually be in my mouth.",
                  msgKor:
                    "내가 여호와를 항상 송축함이여 내 입술로 항상 주를 찬양하리이다.",
                  bookEng: "Psalm",
                  bookKor: "시편",
                  chapAndVerse: "34:1",
                },
                {
                  msgEng:
                    "We are not grateful for the abundance of things, but because we are able to be grateful in the midst of difficulties.",
                  msgKor:
                    "객관적으로 풍요로운 것이 많아서 감사하는 것이 아니라, 어려운 가운데서도 감사를 선택했기 때문에 감사할 수 있는 것이다.",
                  bookEng: null,
                  bookKor: null,
                  chapAndVerse: null,
                },
                {
                  msgEng:
                    " I always thank my God for you because of his grace given you in Christ Jesus.",
                  msgKor: "그리스도 예수 안에서 너희에게 주신 하나님의 은혜로 말미암아 내가 너희를 위하여 항상 하나님께 감사하노니.",
                  bookEng: "1 Corinthians",
                  bookKor: "고린도전서",
                  chapAndVerse: "4:1",
                },
                {
                  msgEng:
                    "We praise you, God, we praise you, for your Name is near; people tell of your wonderful deeds.",
                  msgKor:
                    "하나님이여 우리가 주께 감사하고 감사함은 주의 이름이 1)가까움이라 사람들이 주의 기이한 일들을 전파하나이다.",
                  bookEng: "Psalm",
                  bookKor: "시편",
                  chapAndVerse: "75:1",
                },
                {
                  msgEng:
                    "Do not let your emotions control you. You have to struggle and fight. Don't leave yourself to your instincts. Gratitude is earned through training.",
                  msgKor:
                    "감정을 방치하면 안 된다. 몸부림치며 싸워야 한다. 내 본능에 맡기면 안 된다. 감사는 훈련을 통해서 얻어지기 때문이다.",
                    bookEng: null,
                    bookKor: null,
                    chapAndVerse: null,
                },
              
        ]
    })


    return createMessages
}
export const messageRepos = {
    createMessageBatch,
    getTodaysMessage
}


