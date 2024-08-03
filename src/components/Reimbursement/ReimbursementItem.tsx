import { User } from "../User/UserProfile";

export interface Reimbursement {
    reimbId?:number,
    description?:string,
    amount?:number,
    status?:string,
    user?:User,
    createdAt?:string,
    resolvedAt?:string
}