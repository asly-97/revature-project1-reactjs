export interface UserInterface {
    userId?:number,
    firstName?:string,
    lastName?:string,
    username?:string,
    password?:string,
    role?:Role
}

export interface Role{
    roleId?:number,
    name?:string
}
