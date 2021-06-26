
import { List } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Server from './Server';

function ServersList({ user, servers }) {
    const [canAdd, setCanAdd] = useState(true)

    useEffect(() => {
        servers.forEach(e => {
            if (e.owner.id === user.uid) {
                setCanAdd(false)
                return;
            }
        }, [servers])
    })
    return (
        <div >
            <List dense >
                <Server user={user} key={"id_new"} server={null} authorized={canAdd} setCanAdd={setCanAdd} />
                {
                    servers.map
                        (
                            e => <Server user={user} key={e.id} server={e} setCanAdd={setCanAdd} />
                        )
                }
            </List>
        </div>
    )
}

export default ServersList
