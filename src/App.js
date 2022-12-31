import React, {useEffect, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {io} from 'socket.io-client'
import Message from './Message'
import Timer from './Timer';

const socket = io.connect('http://localhost:5000')
    socket.on('connect', ()=>{
       console.log(`You connected with ${socket.id}`)
    })
    
export default function App(props){
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [warning, setWarning] = useState(false)
    function handleChange(e){
        setMessage(e.target.value)
    }
    
    function clearMessages(){
        setMessages([]);
    }

     function handleClick(e){
        e.preventDefault()
        if(message.length > 300){
            setWarning(true);
            setInterval(() => {
                setWarning(false)
            }, 3000)
            return () => clearInterval();
        }else{
            let msgid =  uuidv4();
            console.log(msgid)
            message && socket.emit('message', message, socket.id, props.user, msgid)
            setMessage("")
        }
    }
    function handleLikes(msgid){
        socket.emit("like", msgid, socket.id)
    }
    useEffect(() =>{
        socket.on("receive-message", (data) => {
            setMessages(
                prevMessages => {
                    return [...prevMessages, {...data, likes: []}]
                }
            )
            
        })

        socket.on("like-received", (data) => {
            let {msgid, id} = data;
            setMessages(
                prevMessages => {
                    return prevMessages.map(e => {
                        if(e.msgid === msgid){
                            if(e.likes.length === 0){
                                e.likes = [...e.likes, id]
                                return e
                            }else{
                                let index = e.likes.indexOf(id);
                                if (index > -1) { 
                                    e.likes.splice(index, 1); 
                                    return e
                                  }else{
                                    e.likes = [...e.likes, id]
                                    return e
                                  }
                            }
                        }
                        return e;
                    })
                }
            )
            
        })
    },[socket])
    return<>
        <div className="timer">
            <Timer clearMessages={()=>clearMessages()}/>
        </div>
        <div className="chatBox">
            
            <div className="chatSection">
                {messages.map((e, index) => {
                    let author = e.id === socket.id ? true : false
                    console.log()
                    let data = {
                        message: e.msg,
                        author: author,
                        msgid: e.msgid,
                        user: e.user,
                        likes: e.likes
                    }
                    
                    return <Message key={index} data={data} handleLikes={handleLikes}/>
                })}
            </div>
            <div className="form">
                <form>
                    <input  
                        type='text' 
                        name='message' 
                        value={message}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Send</button>
                    {warning && <p className='danger'>Word Limit 300 words!</p>}
                    
                </form>
            </div>
        </div>
        
        
    </>
}