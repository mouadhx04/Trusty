import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { mobile } from "../responsive";

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

 import { Link } from 'react-router-dom';
import newLogo from "./s.png";

import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import useStyles from './styles';
import Slider from '../Slider/Slider';
import PostDetails from '../PostDetails/PostDetails';
import { ethers, providers } from 'ethers';

const Containerx = styled.div`
height: 73px;
position: fixed;
z-index: 1800 !important;
width: 100%;
bottom: 0px;
left: 0px;
top: 0px;
background: white;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItemx = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


function ResponsiveAppBar() {


  const location = useLocation();

  const [showSlider, setShowSlider] = useState(true);
 
  useEffect(() => {
    if (location.pathname === '/auth' || location.pathname.startsWith ('/psts')) {
      setShowSlider(false);
    } else {
      setShowSlider(true);
    }
  }, [location]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logoutbtn = () => {
    dispatch( { type: 'LOGOUT' } );
    history('/auth');
    setUser(null);
  };

  const toHomePage = () => {
    history('/');
    setUser(null);
  };

  const setSettings = () => {
    console.log('Ready!');
};

  useEffect( () => {
      const token = user?.token;
      if (token) {
          const decodedToken = jwt_decode(token);
          if ( decodedToken.exp * 1000 < new Date().getTime() ) logoutbtn();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const returnHome = () => {
    history('/');
  }
  const settings = [''];


  return (
  <>
  <Containerx>
    <Wrapper>
      <Left>
        <img src={newLogo} width='110 px' onClick={returnHome}></img>
      </Left>
      <Center>
        <Logo>.M E N T A L I T Y</Logo>
      </Center>
      <Right>
        <MenuItemx> <Box sx={{ flexGrow: 0 }} style={{marginLeft: "auto"}}>
          { user ? (
            <div></div> ) : (
                <Link to="/auth" style={{  textDecoration: "none",
                  color: "#353535",
                  fontfamily: "Poppins"}}></Link>
              )}  </Box>
        </MenuItemx>

        <MenuItemx> 
          <Box sx={{ flexGrow: 0 }} style={{marginLeft: "auto"}}>
            { user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Badge
                        color='primary'
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <Avatar style={{backgroundColor: '#00B7FF'}} className={classes.purple} src={user?.result?.imageUrl}> {user.result.name.charAt()} </Avatar>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Link to="/auth"  style={{  textDecoration: "none", color: "#353535", fontfamily: "Poppins"}}> SIGN IN </Link>
                )}
                
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >

                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <AccountCircleIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                        <Typography variant='p' className={classes.heading} >{user?.result?.name}</Typography>
                    </MenuItem>
                  ))}

                  <MenuItem onClick={handleCloseUserMenu}>
                    <TuneOutlinedIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                    <Typography variant='p' className={classes.heading} onClick={setSettings} > Settings </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <LogoutIcon color='secondary' fontSize="small" style={{paddingRight: '0.3em'}}/>
                    <Typography variant='p' className={classes.heading} onClick={logoutbtn} > Logout </Typography>
                  </MenuItem>

                </Menu>
          </Box>
        </MenuItemx>
          <MenuItemx>
          </MenuItemx>
      </Right>
    </Wrapper>
  </Containerx>
      <div> 
        {showSlider && <Slider />}
      </div>
  </>
  );
}
export default ResponsiveAppBar;