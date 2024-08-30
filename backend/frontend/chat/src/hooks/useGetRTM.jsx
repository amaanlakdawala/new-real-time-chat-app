import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const useGetRTM =()=>{
    const dispatch = useDispatch()
    const {socket} = useSelector(store=>store.socketio)
    const {messages} = useSelector(store=>store.message) 
    useEffect(()=>{
        socket?.on('newMessage', (message )=>{
            dispatch(setMessages([...messages,message]))
        })
        return ()=>{
            socket?.off('newMessage');
        }
    },[messages,setMessages])
     
}
export default useGetRTM