class ProductManager {
    static sid = 0;
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
       
        let codigoRepetido = false
        this.products.map((e) => {
            if (code === e.code) {
                return codigoRepetido = true
            } else {
                return codigoRepetido = false
            }
        })

        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code ==  undefined || stock == undefined) {
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
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        
        const elemento = this.products.find(e => e.id === id)
        if (elemento === undefined) {
            console.log("Not found")
        } else {
            console.log(elemento)
        }
    }

}

const store = new ProductManager()
store.getProducts()
store.addProduct("productoPrueba", "desc1",600, "ruta de prueba", "1abc", 600)
store.getProducts()
store.addProduct("productoPrueba", "descripcion de prueba", 600, "ruta de prueba", "1abc", 600)
store.getProductById(1)
store.getProductById(2)