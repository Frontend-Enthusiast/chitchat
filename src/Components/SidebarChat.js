import { Avatar } from '@material-ui/core'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const SidebarChat = ({ name, id, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      let q = collection(db, `rooms/${id}/messages`);
      let order = query(q, orderBy("timestamp", 'desc'));
      onSnapshot(order, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [])
  const createChat = async () => {
    const roomName = prompt("Please Enter name for chat");
    if (roomName) {
      const newRoomRef = collection(db, "rooms");
      await addDoc(newRoomRef, {
        name: roomName
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (<div onClick={createChat} className='sidebarChat'>
    <h3 className='add-new-chat-title'>Add New Chat</h3>
  </div>)
}

export default SidebarChat