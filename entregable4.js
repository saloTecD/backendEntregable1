const express = require(`express`)

const puerto = 8080

const server = express()

const productManager=require ("./entregable1.js")



server.get(`/products`, async (req, res) => {

    if (req.query.limit){
        let limit=parseInt(req.query.limit)
        res.send(await productManager.store.getProductsLimit(limit))
    }
    else{
        res.send(await productManager.store.getProducts())
    }
})

server.get(`/products/:pid`, async (req, res) => {

    let id=parseInt(req.params.pid)
    res.send(await productManager.store.getProductById(id))

})


server.listen(puerto, () => {
    console.log(`Servidor express activo en puerto:${puerto}`)
})