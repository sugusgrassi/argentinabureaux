import React, { useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] =useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFiles: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData))
    }

    const clear = () => {
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFiles: ''
        })
    }

    return (
        <Paper className={classes.paper}>
         <form autocomplete="off" noValidation className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
             <Typography variant="h6">Publicar bureaux</Typography>
             <TextField name="creator" variant="outlined" label="Autor" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })}> </TextField>
             <TextField name="title" variant="outlined" label="Nombre" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}> </TextField>
             <TextField name="message" variant="outlined" label="Descripción" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}> </TextField>
             <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })}> </TextField>
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
