const express = require('express');
const productAPI = express.Router();
const container = require('./../Container');

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
    writeNewProduct(newProduct)
        .then(id => {
            fetchProductById(id)
                .then(pro => res.json({
                    message: 'Producto guardado',
                    data: pro
                }))
        })
        .catch(e => console.error(e));
});

productAPI.put('/:id', (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    updateProduct(id, newProduct)
        .then(id => {
            fetchProductById(id)
                .then(pro => res.json({
                    message: 'Producto actualizado',
                    data: pro
                }))
        })
        .catch(e => console.error(e));
});

productAPI.delete('/:id', (req, res) => {
    const { id } = req.params;
        deleteProduct(id)
        .then(all => res.json({
            message: 'Producto eliminado',
            data: all
        }))
        .catch(e => console.error(e));
});

const fetchAllProducts = async() => {
    const productContainer = await container.initialize('productos.txt');
    return productContainer.getAll();
};

const fetchProductById = async(id) => {
    const productContainer = await container.initialize('productos.txt');
    const obj = productContainer.getById(Number(id));
    return obj;
};

const fetchRandomProduct = async() => {
    const objects = await fetchAllProducts();
    return objects[Math.floor(Math.random() * objects.length)];
};

const writeNewProduct = async(newProduct) => {
    const productContainer = await container.initialize('productos.txt');
    const product = await productContainer.save(newProduct);
    return product;
};

const updateProduct = async(id, newProduct) => {
    const productContainer = await container.initialize('productos.txt');
    const product = await productContainer.updateById(Number(id), newProduct);
    return product;
};

const deleteProduct = async(id) => {
    const productContainer = await container.initialize('productos.txt');
    await productContainer.deleteById(Number(id));
    return await fetchAllProducts();
};

module.exports = productAPI;
