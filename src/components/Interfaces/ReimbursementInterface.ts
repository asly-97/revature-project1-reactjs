import { UserInterface } from "./UserProfileInterface";

export interface ReimbursementInterface {
    reimbId?:number,
    description?:string,
    amount?:number,
    status?:string,
    user?:UserInterface,
    createdAt?:string,
    resolvedAt?:string
}