import React, { useState  ,useEffect} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

function Modal({ isOpen, onClose, onSave , defaultTitle, defaultContent  }) {
/*   const [title, setTitle] = useState(defaultTitle || '');
  const [content, setContent] = useState(defaultContent || ''); */

  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    // Update title and content when defaultTitle or defaultContent change
    setTitle(defaultTitle || '');
    setContent(defaultContent || '');
  }, [defaultTitle, defaultContent]);


  const handleSave = () => {
    onSave(title, content);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <input placeholder="New Title" className="modaltitlefield" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="New Content" className="modalcontentfield" value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="save" onClick={handleSave}><SaveIcon /></button>
        <button className="close" onClick={onClose}><CancelIcon /></button>
      </div>
    </div>
  );
}

export default Modal;