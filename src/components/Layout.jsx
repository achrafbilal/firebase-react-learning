
import React, { useState } from 'react'
import "../css/layout.css"
import Left from './Left'
import Top from './Top'
function Layout({ children, server, setServer, user, servers, username, setUsername, toggleDark }) {
    const [leftOpen, setLeftOpen] = useState(false);
    const navigate = (to) => {
        console.log(to)
    }
    return (
        <div className="App">
            <Top server={server} className="topbar" toggleDark={toggleDark} setLeftOpen={setLeftOpen} navigate={navigate} username={username} setUsername={setUsername} />
            <Left open={leftOpen} setLeftOpen={setLeftOpen} setServer={(a) => {
                setServer(a)

                setLeftOpen(false)
            }} user={user} servers={servers} />
            {children}
        </div>
    )
}

export default Layout
