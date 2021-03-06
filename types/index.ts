

export interface IErrorEngKor {
    eng: string,
    kor: string
}

export interface IFullInfoData {
    id: number,
    groupId: number,
    username: string,
    firstName: string,
    lastName: string,
    age: Int16Array,
    email: string,
    createdAt: string,
    currentDay: number,
    streak: number,
}

export interface IPostFullInfo {
    author: {
        firstName: string,
        username: string
    },
    authorId: number,

    createdAt: string,
    groupId: number,
    id: number,
    isPrivate: boolean,
    msg: {
        bookEng: string | null,
        bookKor: string | null,
        msgEng: string,
        msgKor: string,
        chapAndVerse: string | null,
    },
    
    msgId: number,
    thoughtOnVerse1: string
    thoughtOnVerse2: string
    thoughtOnVerse3: string
    thoughtOnVerse4: string
    thoughtOnVerse5: string
    showThanks1: string
    showThanks2: string
    showThanks3: string
}

export interface ILoginForm {
    email: string,
    password: string
}

export interface IErrorState {
    eng: string;
    kor: string;
  }

export interface IRegisterStep1Form {
    firstName: string,
    lastName: string,
    age: number
}

export interface IRegisterStep2Form {
    email: string,
    username: string,
    password: string,
    repeatPassword: string
}


export interface IRegisterStep3Form {
    finder: string,
    name: string
}


export interface IRegisterData {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    username: string,
    password: string,
    repeatPassword: string,
    finder: string,
    name: string
}


export interface IUserInfo {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    groupId: number,
    age: number,
    createdAt: string,
    currentDay: number,
    streak: number,
    username: string,
    posts: IPostFullInfo[]
}

export interface IMessage {
    id: number,
    msgEng: string,
    msgKor: string,
    bookEng: string | null,
    bookKor: string | null,
    chapAndVerse: string | null
}

export interface IPostForm {
    thoughtOnVerse1: string
    thoughtOnVerse2: string
    thoughtOnVerse3: string
    thoughtOnVerse4: string
    thoughtOnVerse5: string
    showThanks1: string,
    showThanks2: string,
    showThanks3: string,
    isPrivate: boolean
}

export interface ICreatePostData extends IPostForm {
    msgId: number,
    userId: number,
    groupId: number
}

export interface IGroupInfo {
    id: number,
    createdAt: string,
    finder: string,
    name: string,
    posts: IPostFullInfo[]
    users: IUserInfo[]
}


export interface IHomeInfo {
    createdAt: string,
    currentDay: string,
    email: string,
    firstName: string,
    updatedAt: string,
    group: 
        {createdAt: string,
        name: string,
        posts: [{
            id: number
        }]
    }
    
    groupId: number,
    id: number,
    lastName: string,
    posts: [id: number]
    username: string
}

export interface IPostInfoMobileState {
    msgId: number
    author: string;
    createdAt: string
    thoughtOnVerse1: string;
    thoughtOnVerse2: string;
    thoughtOnVerse3: string;
    thoughtOnVerse4: string;
    thoughtOnVerse5: string;
    showThanks1: string
    showThanks2: string
    showThanks3: string
    bookEng: string | null;
    bookKor: string | null;
    msgEng: string;
    msgKor: string;
    chapAndVerse: string | null;
    authorUsername: string;
    show: boolean
}

