import React, { useState } from 'react'
import { Add, KeyboardArrowRight as Join, DeleteForever, VpnKey } from '@material-ui/icons'
import { database } from '../hooks/useAuth'


function Server({ server, user, authorized, setCanAdd }) {
    const [newServerName, setNewServerName] = useState("")

    const addServer = () => {
        database
            .collection('servers')
            .get()
            .then(
                (s) => {
                    database.collection('servers').add({
                        name: newServerName,
                        owner: database.doc('users/' + user.uid),
                        password: ''
                    })
                })
    }
    const deleteServer = () => {
        database.collection('servers').doc(server.id).delete()
        setCanAdd(true)
        server.setServer(null)

    }
    const lockServer = () => {
        console.log(server);
        database.collection('servers').doc(server.id).set({ name: server.name, owner: server.owner, password: prompt('Specify the new password') })
        server.setServer(null)
    }
    const joinServer = () => {
        if (server.password.length > 0) {
            if (prompt('Password : ') === server.password) {
                server.setServer(server)
            }
            else alert('wrong password')
        }
        else server.setServer(server)
    }
    if (server)
        return (
            <div className="server_item_container">
                <div className="server_item_left">
                    {server.name}
                </div>
                <div className="server_item_center">
                    {server.owner.id === user.uid && <DeleteForever onClick={() => deleteServer()} />}


                </div>
                <div className="server_item_center">
                    {server.owner.id === user.uid && <VpnKey onClick={() => lockServer()} />}
                </div>
                <div className="server_item_right">
                    <Join onClick={() => joinServer()} />
                </div>
            </div>
        )
    else
        return (

            authorized &&
            <>
                <div className="server_item_container">

                    <div className="server_item_left">
                        <input type='text' value={newServerName} onChange={e => setNewServerName(e.target.value)} />
                    </div>
                    <div className="server_item_center">
                        You only can create 1 server
                    </div>
                    <div className="server_item_right">
                        <Add onClick={() => addServer()} />
                    </div>
                </div>
            </>

        )

}

export default Server
