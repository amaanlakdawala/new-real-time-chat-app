import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAuthUser } from "../redux/authSlice"

const getUserProfile = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchUserData = async ()=>{
            try {
                const res = await axios.get(`${window.location.origin}/api/v1/user/getUserProfile`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAuthUser(res.data.user))

                }
            } catch (error) {
                console.log(error)
                console.log("error in getUserProfile Hook")
            }
        }
        fetchUserData();
    },[dispatch])

    
    
}

export default getUserProfile;