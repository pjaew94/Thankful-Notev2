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
    username: string
}

