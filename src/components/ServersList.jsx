import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import Server from './Server';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function ServersList() {
    var arrs = [];
    let i = 0
    for (i; i < 30; i++)arrs.push(i)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {arrs.map
                    (
                        (e, i) =>
                            <Server key={i} server={{ name: `Maroc-${e}`, owner: 'achraf', id: i }} />
                    )}
            </Grid>
        </div>
    )
}

export default ServersList
