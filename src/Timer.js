import React, {useState, useEffect} from "react"

export default function Timer(props){
    const [seconds, setSeconds] = useState(0)
    useEffect(() =>{
        setInterval(() => {
            let d = new Date();
            let currentSeconds = d.getUTCSeconds();
            if(currentSeconds === 0){
                props.clearMessages();
            }
            setSeconds(currentSeconds)
        }, 1000)
        return () => clearInterval();
    })
    return <>
        <p>Messages will Clear in: </p>
        <h1 className={seconds > 44 ? "danger": ""}>
            {seconds < 51 ? "" : 0}{60-seconds}
        </h1>
        <p> Seconds</p>
    </>
}