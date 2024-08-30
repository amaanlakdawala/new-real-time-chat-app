import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetAllMessage = (id)=>{
    const dispatch  = useDispatch()
    useEffect(()=>{
        if(!id) return
        const fetchMessages = async ()=>{

            try {
                const res = await axios.get(`${window.location.origin}/api/v1/message/getMessages/${id}`,{withCredentials:true})
                if(res.data.success){

                    dispatch(setMessages(res.data.messages))
                    console.log("Messages dispatched successfully")
    
                }else{
                    console.log("No messages")
                }
            } catch (error) {
                console.log(error)
                console.log("Error in Get all message hook")
            }
        } 
        fetchMessages()
    },[id,dispatch])
    
}

export default useGetAllMessage