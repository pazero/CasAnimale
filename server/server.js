const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get("/users/", (req, res) => {
    res.json({ "users": ["Paolo", "Fede", "Geno"] })
})

app.listen(5000, () => { console.log("Server started on port 5000") })