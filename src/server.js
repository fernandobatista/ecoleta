const express = require("express")
const server = express()

// public path configuration
server.use(express.static("public"))

// Using Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true    //avoid get old pages during development
})


// App Paths
server.get("/", (req,res) => {
   return res.render("index.html", {
       title: "Seu marketplace de coleta de resíduos"
   })    
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")    
})

server.get("/search", (req,res) => {
    return res.render("search-results.html")    
})

// Start Server
server.listen(3000)

