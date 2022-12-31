import React from 'react'
import likeBlue from './images/like.png'
import likeBlack from './images/like-default.png'

export default function Message(props){
    
    let { user, author, message, likes, msgid  } = props.data
    let messageClass = author ? "left" : "right";
    return (
            <div className={messageClass}>
            <fieldset className={messageClass}>
                <legend>{user}</legend>
                <p>{message}</p>
                <div onClick={()=>props.handleLikes(msgid)} className="likeDiv">
                    <img src={likes.length === 0 ? likeBlack : likeBlue} alt="like" className="like"/>
                    {likes.length !== 0 ? <span className="like">{likes.length}</span> : "" }
                </div>
            </fieldset>
            
            </div>
        

    )
        
}