import axios from "axios"
import { useEffect, useState } from "react"
import { __api_url } from "../../../utils/constants"



export const ReimbursementPage: React.FC = () => {
    
    const[reimbursements,setReimbursements] = useState([])


    const _token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`
        }
    })

    useEffect(() => {
        getAllReimbursements()
    },[])

    
    //load whenver reimbursement updated
    useEffect( () => {

        console.log('- reimbursements -updated: ',reimbursements)
    },[reimbursements])


    const getAllReimbursements = async () => {
        await api.get('/reimbursements')
                .then( ({data}) => {
                    console.log('-- data -- ',data)
                    setReimbursements(data)
                })
                .catch(err => {
                    console.log('-- error -- ',err)
                })
    }

    return(
        <>

        </>
    )
}