import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from "../../actions/posts";
import { Grid } from '@mui/material';

const Comments = ({ post }) => {
    // console.log(post);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [comments, setComments] = useState( post?.comments );
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();
    // console.log(commentsRef)
    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
        };

useEffect( () => {
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
}, [comment] );

  return (
 
        <Grid container spacing={2}>
                  {user?.result?.name && (
          <Grid item xs={8}>
            <div>
              <Typography gutterBottom variant='h6'>Give your feedback </Typography>
                <TextField 
                style={{backgroundColor:'white'}}
                fullWidth 
                minRows={4} 
                variant="outlined" 
                label="Comment" 
                multiline 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} />
                <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                    Add
                </Button>
            </div>
          
            </Grid>
            )}
            <Grid item xs={4}><div >
                <Typography gutterBottom variant='h6'>Comments</Typography>
                <div style={{ border: '1px solid #9e9e9e', height: '157px', maxHeight: '156px',overflowY: 'scroll'}}>
                { comments.map( (comment, index) => (
                    <Typography key={index} variant='subtitle1'>
                        <strong>{comment.split(': ')[0]}</strong>
                        {comment.split(':')[1]}
                    </Typography>
                ) ) }</div>

                <div ref={commentsRef} />

            </div></Grid>
        </Grid>
 
  );
};

export default Comments;