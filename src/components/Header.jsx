import React, { useState, useEffect } from "react";
import { FaSignOutAlt } from 'react-icons/fa'; 
import axios from "axios";




function Header({ isLoggedIn, onLogout , userEmail, viewprofile}) {
  var [userName,setuserName] = useState("");
  var [wantstologout,setwantstologout] =  useState(false);



   useEffect(() => {
    if (isLoggedIn) {
      fetchUserName();
    }
  }, [isLoggedIn]); 

   const fetchUserName = async () => {
    try {
      const response = await axios.post('https://apiforkeeps.netlify.app/api/auth/user', {userEmail});
      console.log(response.data[0].user_username);
      setuserName(response.data[0].user_username); 
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  }; 


  function handleme() {
    setwantstologout(false);
    onLogout();
  }


function optionsfunction() {
  setwantstologout(false);
  viewprofile();
}


   return (

    <header className="text-container">
      {isLoggedIn ? (
        <>
          <h1>Vikas Keeps 📝</h1>
           <button onClick={() => setwantstologout(!wantstologout)}> {userName} <br /><FaSignOutAlt /></button>
           <div className={`${wantstologout ? 'show' : 'hide'} logoutdiv`}>
              <button className="logoutmodalcontent" onClick={handleme}>Log Out</button>
              <button className="viewprofilemodalcontent" onClick={optionsfunction}>View Profile</button>
           </div>
        </>
      ) : (
        <>
          <h1>Vikas Keeps 📝</h1>
        </>
      )}
    </header>

  );
}



/* function Header({ isLoggedIn, onLogout , userEmail}) {
  var [userName,setuserName] = useState("");

   useEffect(() => {
    if (isLoggedIn) {
      fetchUserName();
    }
  }, [isLoggedIn]); 

   const fetchUserName = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/user', {userEmail});
      setuserName(response.data[0].user_username); 
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  }; 

   return (
    <header className="text-container">
      {isLoggedIn ? (
        <>
        <Avatar alt="Akhand Bharat" src="https://imgur.com/2GBrzcY.jpg" />
          <h1>Vikas Keeps </h1>
          <button onClick={onLogout}> <h4>{userName}</h4> Logout</button>
        </>
      ) : (
        <>
          <Avatar alt="Akhand Bharat" src="https://imgur.com/2GBrzcY.jpg" />
          <h1>Vikas Keeps </h1>
        </>
      )}
    </header>
  );
}  */

export default Header;


