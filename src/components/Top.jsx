import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
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
function Top({ setLeftOpen, server, username, setUsername }) {

    const { user, logout } = useAuth();
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static" color="secondary">
                <Toolbar component="div" variant="dense">
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
                    <Typography variant="h6" className={classes.title} onClick={() => {
                        let a = prompt('Specify your username')

                        setUsername(a.length > 1 ? a : "user")
                    }}>

                        {user && (username ? username : 'user')}
                    </Typography>
                    {
                        user &&
                        <div className="top_right_nav">
                            <span className="top_right_nav_element">
                                {user.email}
                            </span>
                            <Link to="/" color="inherit" >
                                <span className="top_right_nav_element">
                                    Home
                                </span>
                            </Link>
                            <Link to="/logout" onClick={() => logout()} color="inherit" >
                                <span className="top_right_nav_element">
                                    Logout
                                </span>
                            </Link>
                        </div>
                    }
                    {
                        !user &&
                        <div className="top_right_nav">
                            <Link to="/login" color="inherit" >
                                <span className="top_right_nav_element">
                                    Login
                                </span>
                            </Link>
                            <Link to="/register" color="inherit" >
                                <span className="top_right_nav_element">
                                    Register
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
