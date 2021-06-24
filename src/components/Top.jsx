import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const useStyles = makeStyles
    (
        (theme) =>
        (
            {
                root: {
                    flexGrow: 1,
                },
                menuButton: {
                    marginRight: theme.spacing(2),
                },
                title: {
                    flexGrow: 1,
                },
            }
        )
    );
function Top({ setLeftOpen, server }) {

    const { user, logout } = useAuth();
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                {
                    user &&
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setLeftOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                }
                <Typography variant="h6" className={classes.title}>
                    Tencord
                </Typography>
                <Typography variant="h6" className={classes.title}>

                    {user && (server ? server.name : 'default')}
                </Typography>
                {
                    user &&
                    <>
                        <span>
                            {user.email}
                        </span>
                        <Link as={Button} to="/" color="inherit" >Home</Link>
                        <Link as={Button} onClick={() => logout()} color="inherit" >Logout</Link>
                    </>
                }
                {
                    !user &&
                    <>
                        <Link to="/login" color="inherit" >Login</Link>
                        <Link to="/register" color="inherit" >Register</Link>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Top
