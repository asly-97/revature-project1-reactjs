export interface User {
    userId:number,
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    role:Role
}

interface Role{
    roleId:number,
    name:string
}