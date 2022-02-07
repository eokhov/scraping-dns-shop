const express = require('express');
const getProductInfo = require('./service/get-product-info.js');

const app = express();
app.disable('x-powered-by');

app.get('/', async (req, res) => {
  const productLink =
    'https://www.dns-shop.ru/product/4623cd4d0da43332/61-smartfon-apple-iphone-12-256-gb-cernyj/';
  try {
    const productInfo = await getProductInfo(productLink);
    res.json(productInfo);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = app;
