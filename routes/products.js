const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const productAPI = express.Router();
let Container = require('./../Container');

productAPI.get('/', (req, res) => {
    fetchAllProducts()
        .then(all => res.json({
            message: 'Array con todos los productos',
            data: all
        }))
        .catch(e => console.error(e));
});

productAPI.get('/random', (req, res) => {
    fetchRandomProduct()
        .then(random => res.json({
            message: 'Producto aleatorio',
            data: random
        }))
        .catch(e => console.error(e));
});

productAPI.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id capturado: ' + id);
    fetchProductById(id)
        .then(result => {
            result === null
                ? res.json({
                    message: 'Producto no encontrado :(',
                })
                : res.json({
                    message: 'Producto encontrado',
                    data: result
                })
        })
        .catch(e => console.error(e));
});

productAPI.post('/', (req, res) => {
    const newProduct = req.body;
    console.log('producto nuevo: ' + JSON.stringify(newProduct))
    writeNewProduct(newProduct)
        .then(res.json({
            message: 'Producto guardado',
        }))
        .catch(e => console.error(e));
});

const fetchAllProducts = async() => {
    const container = await Container.initialize('productos.txt');
    return container.getAll();
};

const fetchProductById  = async(id) => {
    const container = await Container.initialize('productos.txt');
    const obj = container.getById(Number(id));
    return obj;
};

const fetchRandomProduct = async() => {
    const objects = await fetchAllProducts();
    return objects[Math.floor(Math.random() * objects.length)];
};

const writeNewProduct = async(newProduct) => {
    const container = await Container.initialize('productos.txt');
    const product = await container.save(newProduct);
    return product;
};

module.exports = productAPI;