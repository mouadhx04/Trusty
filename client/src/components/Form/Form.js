import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import {useNavigate} from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost} from '../../actions/posts';
import { Signer } from 'ethers';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '',Waddress: localStorage.getItem("walletAddress"), price:0, tags: '', selectedFile: '' });

  const post = useSelector( (state) => currentId ? state.posts.find( (p) => p._id === currentId ) : null );
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useNavigate();

  useEffect(() => {
    if (post) setPostData(post);
  }, [ post ]);

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId === 0) {

      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {

      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      alert(JSON.stringify(postData));
    }
    clear();
  };

  const clear =  () => {
 
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography style={{color: '#000000ab'}} variant='h6' align='center'>
          Please Sign In And Get An Amazing Experience on Trusty! 
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper style={{boxShadow: "0px 0px 0px 0px"}} className={classes.paper} elevation={7}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography style={{color: '#000000ab'}} variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a new item'}</Typography>
        <TextField name="price" type="number" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;