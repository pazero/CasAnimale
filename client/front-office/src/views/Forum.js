import React from "react";
import Footer from "../components/Footer";
import Blog from "../components/ArticleList";
import Navbar from "../components/Navbar";

const MyAnimalShowcase = () => {
  return (
    <div data-theme="lemonade" className="App flex h-screen flex-1" style={{flexDirection:"column", justifyContent:"space-between", maxHeight:"100%"}}>
      <div className="flex flex-1" style={{height:"4rem",maxHeight:"4rem"}}>
        <Navbar />
      </div>
      <div className="flex flex-1" style={{height:"auto"}}>
         <Blog style={{display:'flex', height:'100%'}} />
      </div>
      <div className="flex flex-1" style={{height:"auto"}}>
        <Footer />
      </div>
    </div>
  );
};

export default MyAnimalShowcase;
