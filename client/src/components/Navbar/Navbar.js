import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import useStyles from './styles';


function Navbar() {
    const classes = useStyles();

    const user = null;
    
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
                        <Button variant="contained" className={classes.logout} color="secondary">Cerrar sesión</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant="contained" color="primary">Iniciar sesión</Button>
                )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar
