
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
        })
    })
    return (
        <div >
            <List dense >
                <Server user={user} key={"id_new"} server={null} authorized={canAdd} />
                {
                    servers.map
                        (
                            e => <Server user={user} key={e.id} server={e} />
                        )
                }
            </List>
        </div>
    )
}

export default ServersList
