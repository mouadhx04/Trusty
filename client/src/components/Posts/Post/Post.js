import React, {useState} from "react";

import { Card, CardActions, CardMedia, CardContent, Typography, Button} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useNavigate } from "react-router-dom";

import UseStyles from "./styles";
import moment from "moment";
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts'

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Post = ({ post, setCurrentId }) => {

    const classes = UseStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user)

    const openPost = () => {
        history(`/psts/${post._id}`);
    }

    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><FavoriteOutlinedIcon fontSize="small" />&nbsp;{`${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        
        <Card className={classes.card} raised elevation={6}>

                <div onClick={openPost} style={{
                    cursor: 'pointer',
                    width: "328x",
                    background: "#fff",
                    padding: "2px",
                    position: "relative",
                    bordeRadius: "8px",
                    margin: "4px"
                }}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6" style={{marginLeft:'12px',marginTop:'15px'}}>{post.name}</Typography>
                    <Typography variant="body2" style={{marginLeft:'12px'}}>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={ () => setCurrentId(post._id) } >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                ) }
              <Typography className={classes.title} variant="h5" >{post.title}</Typography>
            
                    <div>
                        <div  style={{ fontWeight: 'bold', color: '#e94560', padding:'0px !important'}}> {post?.price} ETH  </div>
                    </div>
           
                <div className={classes.details} >
                    <Typography variant="body2" color="textSecondary"> {post.tags.map( (tag) => `#${tag} ` )} </Typography>
                </div>
                </div>
            <CardActions className={classes.CardActions} disableSpacing>

            <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                <Likes />
            </Button>
                    

            { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button className={classes.rightAlignItem} size="small" color='secondary' onClick={ () => dispatch(deletePost(post._id)) }>
                        <DeleteIcon fontSize="small"/> Delete
                </Button>
            ) }

            </CardActions>
        </Card>
    );
}

export default Post;