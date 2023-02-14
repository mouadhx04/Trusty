import React, {useState, useEffect} from "react"
import { Paper, Typography, CircularProgress, Divider, Button, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'; // js library that deals (traite) with time
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./styles";

import {getPost, getPostsBySearch} from "../../actions/posts";

import Comments from './Comment';
 
import styled from "styled-components";

  import { mobile } from "../responsive";
import { ethers } from 'ethers';
import ErrorMessage from './ErrorMessage';
import TxList from './TxList';
import { maxHeight, width } from '@mui/system';

const Container = styled.div` background: antiquewhite`;

const Wrapper = styled.div`
padding-top: 10px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
 
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  font-weight: bold
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  color: #e7737e
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Buttonx = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;


const PostDetails = () => {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const {post, posts, isLoading} = useSelector( (state) => state.posts );
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  const  idd  = useParams(); 
  

  useEffect( () => {
    dispatch( getPost( id ) );
  }, [id] )
  useEffect( () => {
    if (post) {
      dispatch( getPostsBySearch( { search: 'none', tags: post?.tags.join(',') } ) );
    }
  }, [post] )

  if (!post) return "null";

  if (isLoading) {
    return (
      <Paper elevation={7} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }
  // eslint-disable-next-line no-lone-blocks

  const recommendedPosts = posts.filter( ( { _id } ) => _id !== post._id );

  const openPost = (_id) => history(`/psts/${_id}`);
 
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

  const payButton = async (e) => {
    e.preventDefault();
     setError();
     const p = post.price.toString();
    await startPayment({
      setError,
      setTxs,
      ether: p,
      addr: post.Waddress
    });
  };
 
  return ( 


    <Container>

    <Wrapper>
      <ImgContainer  >
        <img style={{width: '100%', height: '700px', maxWidth: '700px'}} className={classes.media} src={post.selectedFile} alt={post.title} />
      </ImgContainer>
      <InfoContainer style={{position: 'absolute', top: '91px', left: '720px'}}>
        <Title>{post.title} </Title>
   
        <Divider style={{ width: '1166px',margin: '20px 0' }} />
         <Typography variant="h5" style={{fontFamily: 'Andalé Mono'}}>Seller: {post.name}</Typography>
          <Typography variant="body1" style={{fontFamily: 'Andalé Mono',    position: 'fixed',      top: '196px',    right: '38px'}}>{moment(post.createdAt).fromNow()}</Typography>
          <Desc>
            {post.message}
          </Desc>
        <Divider style={{ width: '1166px',margin: '20px 0' }} />
        <Grid container spacing={2}>
        <Grid item xs={1}>
        <Button onClick={payButton} style={{ color: 'chocolate', width:'250px !important', backgroundColor:'#d2691e0f'}}> 
          BUY 
          <img src={require('./et.png')} style={{ width: '24px',  marginLeft: '5px'}}/>
        </Button>
        </Grid>

        <Grid item xs={4}><Price>{post.price} ETH</Price></Grid> 
        </Grid>

        <AddContainer>
        </AddContainer>

        <Divider style={{ width: '1166px',margin: '20px 0' }} />
        <Comments post={post} />
      </InfoContainer>
 
    </Wrapper>
    <ErrorMessage message={error} />
          <TxList txs={txs} />
 
           {/** here the logic of the recommanded posts  */}
       { (recommendedPosts) && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h6' style={{fontFamily: 'Andalé Mono'}}> You might also like: </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            { recommendedPosts.map( ( { title, message, name, likes, selectedFile, _id } ) => (
              <div key={_id} style={{ margin: '20px', cursor: 'pointer' }} onClick={ () => openPost(_id) } > 
                <Typography gutterBottom variant='h5'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle2'>Likes: {likes.length}</Typography>
                <img alt={title} src={selectedFile} width='200px'></img>
              </div>
            ) ) }
          </div>
        </div>
      ) }
  </Container>
 
  )
}

export default PostDetails