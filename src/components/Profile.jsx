import React, { useEffect, useState } from "react";
import axios from "axios";


function Profile({showProfile, userEmail, onExit}) {

  const [userprofile,setuserprofile] = useState([]);


  const fetchUserProfile = async () => {
    try {
      const response = await axios.post('https://apiforkeeps.netlify.app/api/auth/user/profile', {userEmail});
      setuserprofile(response.data[0]); 
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  }; 
  
  useEffect(() => {
    if (showProfile) {
      fetchUserProfile();
    }
  }, [showProfile]);   // eslint-disable-line react-hooks/exhaustive-deps
  
  

  return(
    <div className="profilecontainer">
    <h2 isContentEditable="true">Email : {userprofile.user_email} </h2><br />
    <h2>Username : {userprofile.user_username} </h2><br />
    <button onClick={onExit}>Back to Home Page</button>
    </div>
    
  )
} 



export default Profile;
