import { Send } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const location = useLocation();
  const [showSlider, setShowSlider] = useState(true);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
      if (location.pathname === '/auth' || location.pathname.startsWith ('/psts')) {
        setShowSlider(false);
      } else {
        setShowSlider(true);
      }
    }, [location]);

    const clear = () => {
      alert(`Hi there ${user?.result?.name}, Welcome to our newsletter! Can't wait to start sharing content with you.`)
      window.location.reload();
    }

  return (
    <div>  { showSlider ? (<Container>
    <Title>Newsletter</Title>
    <Desc>Get timely updates from your favorite products.</Desc>
    <InputContainer>
      <Input placeholder="Your email" />
      <Button onClick={clear}>
        <Send />
      </Button>
    </InputContainer>
  </Container>):(<div></div>)}</div>

  );
};

export default Newsletter;
