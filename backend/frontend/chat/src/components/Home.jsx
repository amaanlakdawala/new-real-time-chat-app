
import React from 'react'
import useGetAllUsers from '../hooks/useGetAllUsers'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../assets/styling/Home.css'

function Home() {
  
        useGetAllUsers();
        const navigate = useNavigate()
    const {allUsers} = useSelector(state => state.auth);
    // const cardClicked = ()=>{
    //   navigate(`/messages/${user._id}`)

    // }

  return (
    <>
     {/* <div className="container mt-4">
            <div className="row">
                {allUsers?.map((user, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card" onClick={()=>navigate(`/messages/${user._id}`)}>
                            <img 
                                src={user?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"} 
                                alt={user?.name || 'User Profile'} 
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{user?.username}</h5>
                                <p className="card-text">{user?.bio}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> */}


<div className="container mt-4">
  <div className="row">
    {allUsers?.map((user, index) => (
      <div key={index} className="col-md-4 mb-4">
        <div 
          className="card user-card shadow-sm border-0" 
          onClick={() => navigate(`/messages/${user._id}`)}
        >
          <img 
            src={user?.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttE9sxpEu1EoZgU2lUF_HtygNLCaz2rZYHg&s"} 
            alt={user?.name || 'User Profile'} 
            className="card-img-top rounded-circle img-fluid mx-auto d-block mt-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{user?.username}</h5>
            <p className="card-text">{user?.bio}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

     
    
    </>
   
    
  )
     
    
   
   
  
}

export default Home
