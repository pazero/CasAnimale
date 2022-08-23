import React from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"


const App = () => {
    return (
        <>
            <Header />
            <Navbar />
            <h1>CasAnimale</h1>
            <h5>Dove il tuo amico animale si sente a casa</h5>
            <Footer />
        </>
    )
}

export default App