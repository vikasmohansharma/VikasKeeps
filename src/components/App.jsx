import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import Profile from "./Profile";



const API_URL = "https://apiforkeeps.netlify.app/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('username') || ""); 
  const [isRegistering, setIsRegistering] = useState(false); 
  const [selected_user_id,setuserid] = useState(localStorage.getItem('selected_user_id') || 0);
  const [showProfile,setShowProfile] = useState(false);

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username: userEmail, password: password }, { withCredentials: true }); 
      if (response.data.user) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('selected_user_id', response.data.user.id);
        localStorage.setItem('userEmail', userEmail);
        setuserid(() => {
          return response.data.user.id;
        })
        fetchData();
      }
    } catch (error) {
      alert("Invalid Username or Password");
      console.error('Error logging in:', error);
    }
  };


  const handleLogout = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`${API_URL}/logout`, { withCredentials: true }); 
          if (response.data.message === 'Logout successful') {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            setUserEmail("");
            localStorage.removeItem('userEmail');
            setPassword("");
            setUsername("");
            setNotes([]);
            localStorage.removeItem('selected_user_id');
            setuserid(0);
          } else {
            alert("Logout failed. Please try again.");
          }
        } catch (error) {
          console.error('Error logging out:', error);
          alert("An error occurred while logging out. Please try again later.");
        }
    }
  };

  // Function to handle register
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email: userEmail, password, username }, { withCredentials: true }); 
      if (response.data.message === 'User registered successfully') {
        handleLogin();
      }
    } catch (error) {
      alert("The email or username already exists");
      console.error('Error registering:', error);
    }
  };

  //fetch all the notes belonging to the current user
  async function fetchData() {
    try {
      const response = await axios.get(`${API_URL}/notes/show/${selected_user_id}`, { withCredentials: true }); 
      let received_array = response.data;
      console.log(received_array);
      setNotes(received_array);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //used to render the react app whenever the reRender variable changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [reRender, isLoggedIn]);

  //Add a new note 
  async function addNote(newNote) {
    try {
      await axios.post(`${API_URL}/notes/add/${selected_user_id}/`, newNote, { withCredentials: true }); 
      console.log("Inserted Successfully");
      setReRender((prevValue) => {
        return prevValue + 1;
      })
    }
    catch (error) {
      console.log(`Error encountered in App.jsx : ${error}`);
    }
  };

  //Delete a note
  async function deleteNote(id) {
    const selectedNote = notes.filter((noteItem, index) => {
      return index === id;
    });
    const selectedNoteid = selectedNote[0].note_id;
    console.log(selectedNoteid);
    try {
      await axios.delete(`${API_URL}/notes/delete/${selected_user_id}/${selectedNoteid}`, { withCredentials: true }); 
      console.log("Deleted Successfully");
      setReRender((prevValue) => {
        return prevValue + 1;
      });
    } catch (error) {
      console.log(`Error encountered in App.jsx : ${error}`);
    }
  }

  //Edit a note
  async function editNote(id, title, content) {
    var s = new Date();
    var d = s.getDay() + "/" + s.getMonth() + "/" + s.getFullYear() + " " + s.getHours() + ":" + s.getMinutes();
    const status = "Edited at " + d;
    const selectedNote = notes.filter((noteItem, index) => {
      return index === id;
    });
    const selectedNoteId = selectedNote[0].note_id;
    console.log(selectedNoteId);
    try {
      await axios.patch(`${API_URL}/notes/edit/${selected_user_id}/${selectedNoteId}`, { title, content, status }, { withCredentials: true }); 
      setReRender((prevValue) => {
        return prevValue + 1;
      });
    } catch (error) {
      console.log(`Error encountered in App.jsx : ${error}`);
    }
  }

function ProfileUnShower() {
  setShowProfile(false);
}

function ProfileShower() {
  setShowProfile(true);
}

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userEmail={userEmail} viewprofile={ProfileShower} />
      {isLoggedIn ? (
        showProfile ? 
          (<Profile showProfile={showProfile} userEmail={userEmail} onExit={ProfileUnShower}/>
          ) : (
        <>
          <CreateArea onAdd={addNote} />
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={index}
                title={noteItem.note_title}
                content={noteItem.note_content}
                status={noteItem.datetimedetails}
                onDelete={deleteNote}
                onEdit={editNote}
              />
            );
          })}
        </>
       )
       ): (
        <div className="login-container">
          <div className="tabs">
            <button className={!isRegistering ? "active" : ""} onClick={() => setIsRegistering(false)}>Login</button>
            <button className={isRegistering ? "active" : ""} onClick={() => setIsRegistering(true)}>Quick Register</button>
          </div>
          <b>
            <input id="input_email" type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
            <input id="input_password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {isRegistering && (
              <input id="input_username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            )}
            <button onClick={isRegistering ? handleRegister : handleLogin}><h3>{isRegistering ? 'Quick Register' : 'Login'}</h3></button>
          </b>
        </div>
      )}
      <Footer />
    </div>
  );

}

export default App;


  // Function to handle logout
/*   const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`${API_URL}/logout`, { withCredentials: true }); 
          if (response.data.message === 'Logout successful') {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            setUserEmail("");
            localStorage.removeItem('userEmail');
            setPassword("");
            setUsername("");
            setNotes([]);
            localStorage.removeItem('selected_user_id');
            setuserid(0);
          } else {
            alert("Logout failed. Please try again.");
          }
        } catch (error) {
          console.error('Error logging out:', error);
          alert("An error occurred while logging out. Please try again later.");
        }
      } else {
        alert("You are not logged in.");
      }
    }
  }; */
