import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useStateValues } from '../StateProvider';
const Chat = () => {
    const [seed, setSeed] = useState();
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState();
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValues();
    useEffect(() => {
        if (roomId) {
            const getData = async () => {
                const docRef = doc(db, "rooms", roomId);
                const wantDoc = await getDoc(docRef);
                setRoomName(wantDoc.data().name);
            }
            getData();
            let q = collection(db, `rooms/${roomId}/messages`);
            let order = query(q, orderBy("timestamp", 'desc'));
            onSnapshot(order, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        const createMessage = async () => {
            await setDoc(doc(collection(db, `rooms/${roomId}/messages`)), {
                message: input,
                Name: user.displayName,
                timestamp: serverTimestamp(),
            });
        }
        createMessage();
        setInput("");
    }
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last Seen {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map((message, i) => (
                    <p key={i} className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                        <span className='chat_name'>{message.Name}</span>
                        {message.message}
                        <span className='chat_timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}

            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}>Type a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat