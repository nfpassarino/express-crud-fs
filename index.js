const express = require('express');
const productsRoute = require('./routes/products');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

app.use('/api/productos', productsRoute);

app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal :(');
});
