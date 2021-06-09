
import React, { useState } from 'react'
import "../css/layout.css"
import Left from './Left'
import Top from './Top'
function Layout({ children }) {
    const [leftOpen, setLeftOpen] = useState(false);
    const navigate = (to) => {
        alert(to)
    }
    return (
        <div className="App">
            <div className="App">
                <Top setLeftOpen={setLeftOpen} navigate={navigate} />
                <Left open={leftOpen} setLeftOpen={setLeftOpen} />
                {children}
            </div>
        </div>
    )
}

export default Layout
