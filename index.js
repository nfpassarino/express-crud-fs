const express = require('express');
let Container = require('./Container.js');
const productsRoute = require('./routes/products');

const app = express();
const PORT = 8080;
let count = 0;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Servidor OK');
});

app.use('/api/productos', productsRoute);

app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal :(');
});