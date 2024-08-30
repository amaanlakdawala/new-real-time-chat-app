import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessagedUsers } from "../redux/authSlice"

const getMessagedUser = ()=>{
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchMesssagedUsers = async ()=>{
            try {
                const res = await axios.get(`${window.location.origin}/api/v1/message/getMessagedUser/${user._id}`,
                    {withCredentials:true}
                )
                console.log(res.data.users)
                if(res.data.success) {
                    dispatch(setMessagedUsers(res.data.users))
                    console.log("Messaged dispatched successfully")
                }

                
            } catch (error) {
                console.log(error)
                console.log("error in fetchedmessagedUser hook")
            }

        }
        fetchMesssagedUsers()
    },[])
    

}
export default getMessagedUser