import axios from "axios";
import { redirect } from "react-router-dom";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import { __api_url } from "../utils/constants";


const reimbursementService = {
    getAllReimbursements: async ()=>{
        let token = localStorage.getItem('token');
        if(token){
            const api = axios.create({
                baseURL: __api_url,
                headers: {'Authorization': 'Bearer '+token}
            });
            return api.get('/reimbursements')
                .then((response)=>{
                    return response.data;
                })
                .catch((error) =>{
                    return null;
                });
        }
        else
            return null;
    },

    getPendingReimbursements: async ()=>{
        let token = localStorage.getItem('token');
        if(token){
            const api = axios.create({
                baseURL: __api_url,
                headers: {'Authorization': 'Bearer '+token}
            });
            return api.get('/reimbursements/pending')
                .then((response)=>{
                    return response.data;
                })
                .catch((error) =>{
                    return null;
                });
        }
        else
            return null;
    },

    getReimbursementsByUserID: async (id:number)=>{
        let token = localStorage.getItem('token');
        if(token){
            const api = axios.create({
                baseURL: __api_url,
                headers: {'Authorization': 'Bearer '+token}
            });
            return api.get('/user/'+id+'/reimbursements')
                .then((response)=>{
                    return response.data;
                })
                .catch((error) =>{
                    return null;
                });
        }
        else
            return null;
    }
}

export default reimbursementService;
