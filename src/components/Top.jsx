import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { NavigateBefore } from '@material-ui/icons';
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
function Top({ setLeftOpen, navigate }) {
    const { user, logout } = useAuth();
    const classes = useStyles();
    console.log(user)
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
                {
                    user &&
                    <>
                        <Link to="/" color="inherit" >Home</Link>
                        <Link to="/logout" color="inherit" >Logout</Link>
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
