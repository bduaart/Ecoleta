const express = require("express")
const server = express()

server.use(express.static("public"))

const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => { 
    res.render("index.html")
})

server.get("/create-point", (req, res) => { 
    res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    res.render("search-results.html")
})

server.listen(3000)