export enum Role {
    Manager = 'manager',
    Admin = 'admin',
    User = 'user',
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export interface IAuthenticate {
    user: User;
    token: string;
}