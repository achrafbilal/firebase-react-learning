
import React, { useState } from 'react'
import "../css/layout.css"
import Left from './Left'
import Top from './Top'
function Layout({ children, server, setServer, user, servers }) {
    const [leftOpen, setLeftOpen] = useState(true);
    const navigate = (to) => {
        alert(to)
    }
    return (
        <div className="App">
            <Top server={server} className="topbar" setLeftOpen={setLeftOpen} navigate={navigate} />
            <Left open={leftOpen} setLeftOpen={setLeftOpen} setServer={setServer} user={user} servers={servers} />
            {children}
        </div>
    )
}

export default Layout
