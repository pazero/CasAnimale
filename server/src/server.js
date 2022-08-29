const express = require('express')
const cors = require('cors')

const app = express()

app.get('/status', (req, res) => {
    res.send({
        message: "Ciao da express"
    })
})

app.use(cors())

app.listen(8083, console.log("Serving on port 8083!"))
