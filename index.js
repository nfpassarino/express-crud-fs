const express = require('express');
let Container = require('./Container.js');

const app = express();
const PORT = 8080;
let count = 0;


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));

app.get('/productos', (req, res) => {
    fetchAllProducts()
        .then(all => res.json({
            message: 'Array con todos los productos',
            data: all
        }))
        .catch(e => console.error(e));
});

app.get('/productorandom', (req, res) => {
    fetchRandomProduct()
        .then(random => res.json({
            message: 'Producto aleatorio',
            data: random
        }))
        .catch(e => console.error(e));
});

const fetchAllProducts = async() => {
    const container = await Container.initialize('productos.txt');
    return container.getAll();
}

const fetchRandomProduct = async() => {
    const objects = await fetchAllProducts();
    const object = objects[Math.floor(Math.random() * objects.length)];
    return object;
}