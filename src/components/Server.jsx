import React, { useState } from 'react'
import { Add, KeyboardArrowRight as Join, DeleteForever, VpnKey } from '@material-ui/icons'
import { database } from '../hooks/useAuth'


function Server({ server, user, authorized, setCanAdd, exist }) {
    const [newServerName, setNewServerName] = useState("")

    const addServer = () => {
        if (!exist(newServerName))
            database.collection('servers').add({
                name: newServerName,
                owner: database.doc('users/' + user.uid),
                password: ''
            })
    }
    const deleteServer = () => {
        database.collection('servers').doc(server.id).delete()
        setCanAdd(true)
        server.setServer(null)

    }
    const lockServer = () => {
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
                <div className="server_item_left server_item">
                    {server.name}
                </div>
                <div className="server_item_center server_item">
                    {server.owner.id === user.uid && <DeleteForever onClick={deleteServer} />}


                </div>
                <div className="server_item_center server_item">
                    {server.owner.id === user.uid && <VpnKey onClick={lockServer} />}
                </div>
                <div className="server_item_right server_item">
                    <Join onClick={joinServer} />
                </div>
            </div>
        )
    else
        return (

            authorized &&
            <>
                <div className="server_item_container">

                    <div className="server_item_left server_item">
                        <input type='text' value={newServerName} onChange={e => setNewServerName(e.target.value)} />
                    </div>
                    <div className="server_item_center server_item">
                        1 server left
                    </div>
                    <div className="server_item_right server_item">
                        <Add onClick={() => {
                            if (newServerName.length > 0 && newServerName[0] !== ' ') {
                                addServer()
                            }
                            else alert("The server's name must start with a character")
                        }} />
                    </div>
                </div>
            </>

        )

}

export default Server
