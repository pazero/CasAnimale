import React, { useEffect, useState } from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"


const App = () => {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/users/").then( res => {
            if(res.ok)  {
                return res.json()
            }
        }).then(
            jsonRes => {
                setUsers(jsonRes.users)
            }
        )
    }, [])

    return (
        <>
            <Header />
            <Navbar />
            <h1>CasAnimale</h1>
            <h5>Dove il tuo amico animale si sente a casa</h5>
            
            <div>
                {users.map((user) => <li>{user}</li>)}
            </div>
            <Footer />
        </>
    )
}

export default App