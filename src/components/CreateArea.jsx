import React, { useState, useEffect, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    status : "Added at " + new Date().toLocaleString(),
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if (note.title.trim() !== "" || note.content.trim() !== "") {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
        status :"Added at " + new Date().toLocaleString(),
      });
      event.preventDefault(); 
      setIsExpanded(false);
    }
    else {
      alert("Empty notes are not accepted");
    }
  }

  function expand() {
    setIsExpanded(true);
  }

  function shrink() {
    setIsExpanded(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        shrink();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef}>  
      <form className="create-note">
        {isExpanded ? <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title ✏️"
        /> : null}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note... ✏️"
          rows= {isExpanded?  "3" : "1"}
          onClick = {expand} //To add expanding effect to the input area
        />
        <Zoom in={isExpanded}><Fab onClick={submitNote}><AddIcon/></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
