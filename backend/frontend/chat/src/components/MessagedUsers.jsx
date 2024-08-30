import React from 'react'
import getMessagedUser from '../hooks/useGetMessagedUser'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MessagedUsers() {
    getMessagedUser()
    const {messagedUsers} = useSelector(store=>store.auth)
    const {allUsers} = useSelector(store=>store.auth)
    const navigate = useNavigate()
  return (
    <>
    <div className="container mt-4">
    <h1>Conversations</h1>
      <div className="row">
        {
          messagedUsers?.map((messagedUser) => (
            <div key={messagedUser.id} className="col-md-4">
              <div className="card mb-4 shadow-sm" >
                <div className="card-body text-center"  onClick={() => navigate(`/messages/${messagedUser.receiverId._id}`)}>
                  {/* Profile Picture */}
                  <img 
                    src={messagedUser.receiverId?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"} 
                    className="rounded-circle mb-3" 
                    alt="Profile" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                  />
                  {/* Username */}
                  <h5 className="card-title">{messagedUser.receiverId.username}</h5>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  </>
  
    
  )
}

export default MessagedUsers