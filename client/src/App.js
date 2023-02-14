import React from "react";
import {Container} from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import ResponsiveAppBar from "./components/Navbar/newNavbar";
import Slider from "./components/Slider/Slider";
import Footer from "./components/footer/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
 


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
   
    return(
        
    <BrowserRouter>

            <ResponsiveAppBar />

            <Routes>
                <Route exact path='/' element={ <Navigate to='/posts' /> } />
                <Route exact path='/posts' element={<Home/>} />
                <Route exact path='/posts/search' element={<Home/>} />
                <Route exact path='/psts/:id' element={<PostDetails/>} />
 
                <Route exact path='/auth' element={ <Auth/> } />
            </Routes>
            <Newsletter/>
            <Footer />
 
    </BrowserRouter>
    )
};

export default App;