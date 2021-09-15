import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
// import useStyles from '../../styles';

import useStyles from './styles';


// react-router-dom: Search params to use as a hook
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch])

    const searchPost = () => {
        if(search.trim() || tags) {
           // dispatch > fetch search post 
           // modify redux + db
           dispatch(getPostsBySearch({search, tags: tags.join(',') })); // to send through the url: ["bureau", "argentina"] => "bureau,argentina"
           history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')} `);
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        // event keycode 13 it's the Return or Enter key on keyboard.
        if(e.keyCode === 13 || e.keyCode === 32) {
            //search post
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    // console.log(tags)
    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Buscar bureau"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput 
                                style={{ margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                // onKeyPress={handleKeyPress}
                                label="Buscar etiquetas"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Buscar</Button>
                        </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6}>
                                <Pagination />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;
