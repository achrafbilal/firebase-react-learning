import { Box, Button, Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        flex: 1,
    },
    container: {
        margin: 10
    }
}));
function Server({ server }) {

    const classes = useStyles();
    return (
        <div style={{ background: '#3F51B5', width: '100%', marginRight: '40px', marginLeft: '40px', marginTop: '10px', padding: '10px', }}>
            {/* <Box display="flex" flexDirection="row" justifyContent="center" alignContent="center" alignItems="center" className={classes.container}> */}
            <Paper style={{ width: '100%', alignContent: 'center', justifyContent: 'space-evenly', flex: 1, display: 'flex', padding: '10px', borderRadius: '40px', }}>
                <Box flexGrow={2} style={{ paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
                    Name : {server.name}
                </Box>
                <Box flexGrow={1} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    Owner : {server.owner}
                </Box>
                <Box flexGrow={1} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <Button variant="outlined" color="default" onClick={() => alert(server.id)}>
                        Join
                    </Button>
                </Box>
            </Paper>
            {/* </Box> */}
        </div>
    )
}

export default Server
