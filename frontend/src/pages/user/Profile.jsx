import React from "react";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../hook/useToast";
import ProfileCard from './../../components/user/profile/ProfileCard';
import UserMenu from './../../components/user/profile/UserMenu';
const Profile = () => {
  const toast = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handdleLogOut = () => {
    logout();
    navigate("/");
    localStorage.removeItem("historyProducts");
    toast.success("Logout successful!");
  };

  return (
    <div className="max-w-screen-xl lg:px-40 px-4 mx-auto ">
      <div className=" ">
        <p className=" text-xl  font-semibold sm:py-6  py-4"> Account</p>
       <div className="">
       <UserMenu />
       <ProfileCard handdleLogOut={handdleLogOut}/>
       </div>
    
      </div>
    
    </div>
  );
};

export default Profile;
