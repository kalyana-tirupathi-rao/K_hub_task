import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './note.css';

function Notebook({ token, setToken }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notebook, setNotebook] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const axiosAuth = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchNotes = () => {
    axiosAuth.get('/notes/get')
      .then(res => {
        setNotebook(res.data);
      })
      .catch(err => {
        console.error("Error fetching notes:", err);
        setMessage('Error fetching notes');
      });
  };

  const addNewNote = () => {
    axiosAuth.post('/notes/add', { title, description })
      .then(() => {
        fetchNotes();
        setTitle('');
        setDescription('');
        setMessage('Note added successfully');
      })
      .catch(err => {
        console.error("Error adding new note:", err);
        setMessage('Error adding new note');
      });
  };

  const updateNote = (id) => {
    axiosAuth.patch(`/notes/update/${id}`, { title: editTitle, description: editDescription })
      .then(() => {
        fetchNotes();
        setEditingId(null);
        setMessage('Note updated successfully');
      })
      .catch(err => {
        console.error("Error updating note:", err);
        setMessage('Error updating note');
      });
  };

  const deleteNote = (id) => {
    axiosAuth.delete(`/notes/delete/${id}`)
      .then(() => {
        fetchNotes();
        setMessage('Note deleted successfully');
      })
      .catch(err => {
        console.error("Error deleting note:", err);
        setMessage('Error deleting note');
      });
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <button onClick={() => setToken(null)}>Logout</button>

      <div className="add-note">
        <h2>Add New Task</h2>
        <input 
          type="text" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addNewNote}>Add New Task</button>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="note-list">
        <h2>To-Do List</h2>
        {notebook.map((val) => (
          <div key={val._id} className="note-item">
            {editingId === val._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => updateNote(val._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
                <button onClick={() => { setEditingId(val._id); setEditTitle(val.title); setEditDescription(val.description); }}>Edit</button>
                <button onClick={() => deleteNote(val._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notebook;