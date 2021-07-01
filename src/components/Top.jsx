import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Dns, Person, Mail, Home, ExitToApp } from '@material-ui/icons';
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
                    cursor: 'pointer'
                },
                title: {
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                titleClickable: {
                    cursor: 'pointer',
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }
        )
    );
function Top({ setLeftOpen, server, username, setUsername }) {

    const { user, logout } = useAuth();
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" color="secondary">
                <Toolbar component="div" variant="dense">
                    {
                        user &&
                        <div className="top_left_nav">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setLeftOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Tencord
                            </Typography>
                            <Typography variant="h6" className={classes.title}>
                                {
                                    server &&
                                    (
                                        <>
                                            <Dns />{"  " + server.name}
                                        </>
                                    )
                                }
                            </Typography>
                            <Typography variant="h6" className={classes.titleClickable} onClick=
                                {
                                    () => {
                                        let a = prompt('Specify your username')
                                        setUsername(a.length > 1 ? a : "user")
                                    }
                                }>
                                <>
                                    <Person />{"  " + username}
                                </>
                            </Typography>
                            <Typography variant="h6" className={classes.title}>
                                <Mail />{" " + user.email}
                            </Typography>


                            {/* <Typography variant="h6" className={classes.title}>
                                <Link to="/" color="inherit" >
                                    <span className="top_right_nav_element">
                                        <Home />
                                    </span>
                                </Link>
                            </Typography> */}
                            <Typography variant="h6" className={classes.title}>
                                <Link to="/logout" onClick={() => logout()} color="inherit" >
                                    <span className="top_right_nav_element">
                                        <ExitToApp />
                                    </span>
                                </Link>

                            </Typography>
                        </div>
                    }
                    {
                        !user &&
                        <div className="top_right_nav_not_auth">
                            <Link to="/login" color="inherit" >
                                <span className="top_right_nav_element">
                                    <Typography variant="h6" className={classes.title}>
                                        Login
                                    </Typography>
                                </span>
                            </Link>
                            <Link to="/register" color="inherit" >
                                <span className="top_right_nav_element">
                                    <Typography variant="h6" className={classes.title}>
                                        Register
                                    </Typography>
                                </span>
                            </Link>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Top
