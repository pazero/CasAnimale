const express = require('express')
const cors = require('cors')

const app = express()


app.get('/', (req, res) => {
    res.send({
        message: "Bella"
    })
})

app.get('/status', (req, res) => {
    res.send({
        message: "Ciao da express"
    })
})

app.get('/users', (req, res) => {
    res.send({
        users: ["Fede", "Geno", "Paolo"],
    })
})

app.use(cors())

app.listen(5000, console.log("Serving on port 5000!"))
