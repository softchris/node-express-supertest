const express = require('express')
const app = express()
const port = 3001
let server;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    name: "book",
  },
  {
    id: 2,
    name: "book2",
  },
];

// GET, POST, PUT, DELETE
app.post('/products', (req, res) => {
  const { name } = req.body;
  const newProduct = { id: products.length + 1, name };
  products = [...products, {...newProduct}];
  res.json(newProduct);
});

app.get('/products', (req, res) => res.json(products));
app.get('/products/:id', (req, res) =>  res.json(products.find(p => p.id === +req.params.id)))

app.get('/', (req, res) => res.send('Hello World!'))

server = app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))

function getServer() {
  return server;
}

module.exports = {
  app,
  getServer
};
