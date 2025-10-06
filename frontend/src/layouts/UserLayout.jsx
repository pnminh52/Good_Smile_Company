import React from 'react'
import Header from './../components/user/Header';
import Footer from './../components/user/Footer';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
    <div>
<div className='sticky top-0 z-90'>
<Header />
  </div>
<Outlet />
<Footer />

    </div>
  )
}

export default UserLayout