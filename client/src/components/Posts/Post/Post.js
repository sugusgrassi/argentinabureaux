import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/thumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

const Post = ({ post }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()} </Typography>
            </div>
            <div clasName={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => ()}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div ></div>
        </Card>
    )
}

export default Post;
