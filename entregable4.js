const express = require(`express`)

const puerto = 8080

const server = express()

const productManager=require ("./entregable1.js")



server.get(`/products`, (req, res) => {

    if (req.query.limit){
        let limit=parseInt(req.query.limit)
        res.send(productManager.store.getProductsLimit(limit))
    }
    else{
        res.send(productManager.store.getProducts())
    }
})

server.get(`/products/:pid`, (req, res) => {

    let id=parseInt(req.params.pid)
    res.send(productManager.store.getProductById(id))

})


server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)
})