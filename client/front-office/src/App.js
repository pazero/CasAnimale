import React, { useEffect, useState } from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"


const App = () => {
    
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/api").then(
            (response) => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    }, [])

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