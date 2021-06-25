import React, { useState } from 'react'
import { Add, KeyboardArrowRight as Join, DeleteForever } from '@material-ui/icons'
import { database } from '../hooks/useAuth'

function Server({ server, user, authorized }) {
    const [newServerName, setNewServerName] = useState("")

    const addServer = () => {
        database
            .collection('servers')
            .get()
            .then(
                (s) => {
                    database.collection('servers').add({
                        name: newServerName,
                        owner: database.doc('users/' + user.uid)
                    })
                })
    }
    const deleteServer = () => {
        database.collection('servers').doc(server.id).delete()
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
                <div className="server_item_right">
                    <Join onClick={() => server.setServer(server)} />
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
