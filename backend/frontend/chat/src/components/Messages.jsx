import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useGetAllMessage from '../hooks/useGetAllMessages';
import { setMessages } from '../redux/messageSlice';
import '../assets/styling/Messages.css'
import useGetRTM from '../hooks/useGetRTM';

function Messages() {
  useGetRTM()
    const dispatch = useDispatch()
    const {messages} = useSelector(store=>store.message)
    const {user} = useSelector(store=>store.auth)
   const [text,setText] = useState('')
   const { id } = useParams();
   const messagesEndRef = useRef(null); 
   const loggedInUserId = user._id
    useGetAllMessage(id)

    if(!id){
        console.log("id not available")
    }
    useEffect(() => {
      // Scroll to the bottom of the messages container when messages change
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
   

   const sendMessage = async () =>{
    try {
        const res = await axios.post(`${window.location.origin}/api/v1/message/sendMessage/${id}`,{text:text},{
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials:true
        })
        if(res){
            console.log("message send")
            console.log(messages)
            const newMessage = res.data.message;
            const updatedMessages = [...messages, newMessage];
            dispatch(setMessages(updatedMessages))
        }
        if(!res) console.log("message not send")
    } catch (error) {
        console.log("error in sendMessage of message component")
        console.log(error)
    }
   }


   


  return (



<>
    
<div className="chat-wrapper">
  <div className="messages-container">
    {messages?.map((message) => (
      <div
        key={message._id}
        className={`message-item ${
          message.senderId._id === loggedInUserId ? 'message-sent' : 'message-received'
        }`}
      >
        {/* Profile Picture */}
        <img
          src={message.senderId.profilePic}
          alt="profile"
          className="message-profile-pic"
        />
        {/* Message Content */}
        <div className="message-content">
          <h6 className="message-username">{message.senderId.username}</h6>
          <p className="message-text">{message.text}</p>
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
  <div className="input-container">
    <input 
      type="text" 
      value={text} 
      onChange={(e) => setText(e.target.value)} 
      placeholder="Type a message" 
      className="message-input"
    />
    <button onClick={sendMessage} className="send-button">Send Message</button>
  </div>
</div>

    </>
   
    
  )
}

export default Messages