import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
  import styled from "styled-components";
  import { mobile } from "../responsive";

  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
  } from "@fortawesome/free-brands-svg-icons";
  
  const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1` `;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;


  
  const Footer = () => {
    const location = useLocation();
    const [showSlider, setShowSlider] = useState(true);

    useEffect(() => {
        if (location.pathname === '/auth' || location.pathname.startsWith ('/psts')) {
          setShowSlider(false);
        } else {
          setShowSlider(true);
        }
      }, [location]);

    return (
        <div>{showSlider?  (<Container>
     
        <Left>
          <Logo>TRUSTY</Logo>
          <Desc>
            A digital marketplace, in it you can build your own businees buy buying your own items or you can purshese the best products. <br />
            TRUSTY provides you with the easiest and secure way of payment with your crypto wallet.
          </Desc>
          <SocialContainer>

          <a href="https://www.youtube.com/"
        className="youtube social" target="_blank">
        <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: '#eb3223', margin: '0 1rem' }}/>
      </a>
      <a href="https://www.facebook.com/mouadh.amemri/"
        className="facebook social" target="_blank">
        <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: '#4968ad', margin: '0 1rem' }}/>
      </a>
      <a href="https://twitter.com/mouadh_04" className="twitter social" target="_blank">
        <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#49a1eb', margin: '0 1rem' }}/>
      </a>
      <a href="https://www.instagram.com/rim_joudi/?hl=fr"
        className="instagram social" target="_blank">
        <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: 'black', margin: '0 1rem' }}/>
      </a>
      <a href="https://www.linkedin.com/in/mouadh-amemri/"
        className="linkedin social" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: '#4968ad', margin: '0 1rem' }}/>
      </a>

          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> Tunis, Tunisia
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +216 22 222 222
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> contact@trusty.tn
          </ContactItem>
          <img src={require('./ws.png')} style={{width:"200px"}} />
        </Right>
       
      </Container>):(<div></div>)}</div>
    
    );
  };
  
  export default Footer;
  