const express = require("express")
const server = express()

//database
const db = require('./database/db')

// public path configuration
server.use(express.static("public"))

// habilitar req.body
server.use(express.urlencoded({ extended: true }))

// Using Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true    //avoid get old pages during development
})

// App Paths
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    })
})

server.get("/create-point", (req, res) => {

    console.log(req.query)
    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    // insert into database
    const query = `
    INSERT INTO places (        
        image,
        name, 
        address, 
        address2, 
        state, 
        city, 
        items) 
    VALUES (?,?,?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", {error: true})
        }

        console.log("Cadastrado com sucesso.")
        console.log(this)
        return res.render("create-point.html",{saved: true})
    }

    db.run(query, values, afterInsertData)
   
})

server.get("/search", (req, res) => {
    
    const search = req.query.search

    // if(search == ""){
    //     //pesquisa vazia
    //     return res.render("search-results.html", {total:0})
    // }

    // db.all(`SELECT * FROM places`, function (err, rows) {
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        //show page with database datas
        console.log(rows)
        const total = rows.length
        return res.render("search-results.html", { places: rows, total })
    })
})

// Start Server
server.listen(3000)

