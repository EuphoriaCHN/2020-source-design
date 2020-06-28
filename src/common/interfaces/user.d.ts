export type USER = {
    userName: string;
    account: string;
    id?: number;
};

export interface USER_WITH_PASSWORD extends USER {
    password: string;
}