import React from 'react'
import { useSelector } from 'react-redux'
import useGetAllUsers from '../hooks/useGetAllUsers'
// import '../assets/styling/Profile.css'




const Profile = () => {
    // useGetAllUsers()
    const {user} = useSelector(state=>state.auth)
  return (
    <>
    <div className="container mt-4 profile-card-container">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card profile-card">
                <div className="card-body profile-card-body">
                    {/* Profile Picture */}
                    <img 
                        src={user?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"} 
                        alt="Profile" 
                        className="img-fluid profile-img"
                    />
                    <h2 className="card-title profile-card-title">{user?.username}</h2>
                    <p className="card-text profile-card-text">{user?.bio}</p>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default Profile