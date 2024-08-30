import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import LeftSideBar from './components/LeftSideBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import Messages from './components/Messages'
import {io} from "socket.io-client"
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import MessagedUsers from './components/MessagedUsers'
const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/update_profile/:id',
        element: <UpdateProfile />
      },
      {
        path:'/messages/:id',
        element:<Messages />
      },{
        path:'/messagedUsers',
        element:<MessagedUsers/>
      }
    ]

  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

function App() {
  const {user} = useSelector(store=>store.auth)
  const {socket} = useSelector(store=>store.socketio)
  const dispatch = useDispatch()
 useEffect(()=>{
  if(user){
    const socketio = io('http://localhost:8000',{
      query:{userId:user?._id},
      transports:['websocket']

    }) // creating connection with backend and sending userid in backend
    dispatch(setSocket(socketio))
    // listening all the events
    socketio.on('getOnlineUsers',(onlineUsers)=>{
      dispatch(setOnlineUsers(onlineUsers))
    })
    return ()=>{
      socketio.close()
      dispatch(setSocket(null))
    }



  } else if(socket){
    socket?.close()
    dispatch(setSocket(null))
  }

 },[user,dispatch])
  

  return (
    <>
      <RouterProvider router={browserRouter} />
      
    </>
  )
}

export default App
