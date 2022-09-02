const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send({
        message: "Bella"
    })
})

app.post('/register', (req, res) => {
    res.send({
        message: `Registrazione effettuata!`
    })
})

app.post('/login', (req, res) => {
    res.json({
        message: `Login effettuato!`
    })
})

app.get('/users', (req, res) => {
    res.send({
        users: ["Fede", "Geno", "Paolo"],
    })
})


app.listen(5000, console.log("Serving on port 5000!"))
