
import { Drawer } from '@material-ui/core'
import React, { } from 'react'
import ServersList from './ServersList'

function Left({ open, setLeftOpen }) {
    return (
        <React.Fragment key={'left'}>
            <Drawer anchor={'left'} open={open} onClose={() => setLeftOpen(false)}>
                <div className="left_menu_container" style={{ background: '#3F51B5' }}>
                    <ServersList />
                </div>
            </Drawer>
        </React.Fragment>
    )
}

export default Left
