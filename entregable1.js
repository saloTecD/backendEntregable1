const fs = require(`fs`)

class ProductManager {
    static sid = 0;
    constructor(pathCustom) {
        this.products = [];
        this.pathCustom = pathCustom;
        this.writeToFile(this.products)

    }
    writeToFile =(productos) => {
        fs.writeFileSync(this.pathCustom, JSON.stringify(productos))
        console.log("Archivo Creado")
    }

    readFromFile =  () => {
        const productosFile =  fs.readFileSync(this.pathCustom, `utf-8`)
        
        let productosFiles = JSON.parse(productosFile)
        
        return productosFiles
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        let array=this.readFromFile(this.pathCustom)
        let codigoRepetido = false
        array.map((e) => {
            if (code === e.code) {
                return codigoRepetido = true
            } else {
                return codigoRepetido = false
            }
        })

        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) {
            console.log("Se deben completar todos los campos para agregar el producto")
        } else if (codigoRepetido == true) {
            console.log("El codigo del Producto ya esta registrado, por favor seleccionar otro codigo")
        }
        else {
            ProductManager.sid++;
            const newProd = {
                id: ProductManager.sid,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            this.products.push(newProd)
        }
        this.writeToFile(this.products)

    }

   

    getProducts() {
        
            const arreglo = this.readFromFile()
            console.log(arreglo)
        }
       
    

    getProductById(id) {
        const arreglo = this.readFromFile()
        const elemento = arreglo.find(e => e.id === id)
        if (elemento === undefined) {
            console.log("Not found")
        } else {
            console.log(elemento)
        }
    }

    updateProduct(id, update) {
        const arreglo =this.readFromFile()
        let arregloActualizado = [...arreglo]
        const indexElemento = arreglo.findIndex(e => {
            return e.id === id
        })
       
        if (indexElemento === -1) {
            console.log("Not found")
        } else {

            arregloActualizado[indexElemento] = { ...arregloActualizado[indexElemento], ...update }

            this.writeToFile(arregloActualizado)
        }
    }

    deleteProduct(id){
        const arreglo = this.readFromFile()
        let arregloActualizado = [...arreglo]
        const indexElemento = arreglo.findIndex(e => {
            return e.id === id
        })
        if (indexElemento === -1) {
            console.log("Not found")
        } else {
            arregloActualizado.splice(indexElemento,1)
            this.writeToFile(arregloActualizado)
            console.log("elemento eliminado")
        }
    }

}

const store = new ProductManager(`./productos.json`)
store.getProducts()
console.log("----------------------------------------")
store.addProduct("productoPrueba1", "desc1", 600, "ruta de prueba", "1abc", 600)
console.log("----------------------------------------")
store.getProducts()
console.log("----------------------------------------")
store.addProduct("productoPrueba2", "descripcion de prueba", 600, "ruta de prueba", "1abcd", 600)
console.log("----------------------------------------")
store.addProduct("productoPrueba3", "descripcion de prueba", 600, "ruta de prueba", "1abcde", 600)
console.log("----------------------------------------")
store.getProductById(1)
console.log("----------------------------------------")
store.getProductById(2)
console.log("----------------------------------------")
store.getProductById(4)
console.log("----------------------------------------")
store.updateProduct(1,{price:200,description:"hola",code:"hhhh"})
store.deleteProduct(4)