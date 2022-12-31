import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'))
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
let user = user_list[Math.floor(Math.random()*user_list.length)];
root.render(<App user={user}/>)