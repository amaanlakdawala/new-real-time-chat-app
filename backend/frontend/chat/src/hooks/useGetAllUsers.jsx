import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllUsers } from "../redux/authSlice";

const useGetAllUsers = () =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllUsers = async ()=>{
        try {
            console.log("inside hook before request")
            const res = await axios.get(`${window.location.origin}/api/v1/user/getAllUsers`, {withCredentials:true})
            console.log(res.data.user)
            if(res.data.success){
                dispatch(setAllUsers(res.data.user))               
            }
        
        
        } catch (error) {
            console.log(error)
            console.log("error in getAll User Hook")

            
        }
    }
    fetchAllUsers();
    },[dispatch])
  
}

export default useGetAllUsers;