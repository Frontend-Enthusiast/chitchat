import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { collection, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import { useStateValues } from '../StateProvider';
const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValues();
    useEffect(() => {
        let roomRef = collection(db, "rooms");
        onSnapshot(roomRef, (snapshot) => {
            setRooms(snapshot.docs.map((item) => (
                { id: item.id, data: item.data() }
            )));
        });
    }, []);
    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src={user?.photoURL} />
                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchIcon />
                    <input placeholder='Search or start a new chat' type='text' />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} name={room.data.name} id={room.id} />
                ))}
            </div>

        </div>
    )
}

export default Sidebar