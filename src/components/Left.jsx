
import { Drawer } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { database } from '../hooks/useAuth'
import ServersList from './ServersList'

function Left({ open, setLeftOpen, setServer, server, user }) {

    const [servers, setServers] = useState([])
    const exist = (name) => {
        servers.forEach((e) => {
            if (e.name === name) return true;
        })
        return false;
    }
    useEffect(() => {
        database
            .collection('servers')
            .orderBy('name', 'asc')
            .onSnapshot
            (
                snap => {
                    console.log('snap')
                    let m = snap.docs.map(e => ({ id: e.id, ...e.data(), setServer: setServer, }))
                    // m.forEach(e => {
                    //     if (e.id === server.id) {
                    //         setServer(e)
                    //     }
                    // })
                    setServers(m)
                }
            )
    }, [])
    return (
        <React.Fragment key={'left'}>
            <Drawer anchor={'left'} open={open} onClose={() => setLeftOpen(false)}>
                {
                    user &&
                    <div className="left_menu_container"  >
                        <ServersList user={user} servers={servers} exist={exist} />
                    </div>
                }
            </Drawer>
        </React.Fragment>
    )
}

export default Left
