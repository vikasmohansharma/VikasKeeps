import React, {useState} from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Modal from './Modal';


function Note(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  
  const handleSave = (newTitle, newContent) => {
    props.onEdit(props.id, newTitle, newContent);
  };




  
 return (
    <><div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <h6 >{props.status}</h6>
      <button onClick={handleClick}><RemoveCircleIcon /></button>
      <button onClick={handleEditClick}><EditNoteIcon /></button></div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        defaultTitle = {props.title}
        defaultContent = {props.content}
      />
    </>
  );
}

export default Note;



/*   function handleClick2() {
    props.onEdit(props.id);
  } */
 /* function date_generator() {
  return new Date();
 } */


 /* I have a react app(App.jsx) that makes use of an api(api_server.js) to interact with a postgres database

Refer the code below 
the selected_user_id is the id of the user that is currently active. All the notes that need to be displayed should be displayed for this particular user and the all the editing, insertion and deletion should happen with respect to this user. 
My database consists of two tables

users_table(id serial primary key
user_email
user_password)

notes_table(note_id serial primary key
user_id foreign key references users_table id
note_title
note_content
datetimedetails)

The selected user id should be equal to the id in the users_table

The problem is I have no Login/Register mechanism to handle registrations for new users or logins for existing users

Also, I want sessions  for each user(preferably stored on the server and not in my database)

Provide me a code so that as soon as my react app is run, it first provides the users with a home page to login/register. If the user is already registered, it should display the notes for that user using the fetchdata function and the show/id route

provide me the modified files and also any new components that need to be added
 */