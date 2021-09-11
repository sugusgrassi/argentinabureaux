import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // const user = null;

    console.log(user);

    // if user is logged, this useEffect will show it in the navBar 
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]); // https://reactrouter.com/web/api/Hooks/uselocation

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        history.push('/');
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Argentina Bureux
                </Typography>
                <ImageSearchIcon className={classes.image} alt="memories" style={{width:"50px", height:"50px" }} />
            </div>
            <Toolbar className={classes.profile}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imgUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Cerrar sesión</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant="contained" color="primary">Iniciar sesión</Button>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
