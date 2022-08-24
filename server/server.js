const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    
    res.json({ "Hello": ["Geno", "Ele", "Elia"] })
})

app.listen(5000, () => { console.log("Server started on port 5000") })