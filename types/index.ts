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