import React from 'react'
import LeftSideBar from './LeftSideBar'
import { Outlet } from 'react-router-dom'
import '../assets/styling/Layout.css'; 

function MainLayout() {
  return (
    <>
    <div className="container-fluid">
  <div className="row">
    <div className="col-md-3 sidebar fixed-sidebar">
      <LeftSideBar />
    </div>
    <div className="col-md-9 content">
      <Outlet />
    </div>
  </div>
</div>



    </>
    
  )
}

export default MainLayout