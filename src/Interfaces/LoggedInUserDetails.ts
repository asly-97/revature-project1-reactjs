

export interface LoggedInUserDetails{
    firstName?:string|null,
    lastName?:string|null,
    username?:string|null,
    role?:UserRole,
    token?:string|null,
}

export enum UserRole{
    Manager = 'manager',
    Employee = 'employee',
}