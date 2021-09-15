import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';



const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] =useState({
        president: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch();

    // to grab the user info
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        
        clear();
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            president: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    // if no user you can't create post:
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Por favor iniciar para cargar bureaux.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
         <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
             <Typography variant="h6">{currentId ? 'Editar' : 'Agregar'} bureau</Typography>
             <TextField name="president" variant="outlined" label="Nombre" fullWidth value={postData.president} onChange={(e) => setPostData({ ...postData, president: e.target.value })}> </TextField>
             <TextField name="title" variant="outlined" label="Presidente" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}> </TextField>
             <TextField name="message" variant="outlined" label="Descripción" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}> </TextField>
             <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}> </TextField>
             <div className={classes.fileInput}>
                 <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                 ></FileBase>
             </div>
             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Publicar</Button>
             <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Resetear</Button>
         </form>   
        </Paper>
    )
}

export default Form;
