const express = require('express');
const fs = require('fs');
const handler = require('./handler');
const router = express.Router();

const pathJSON = './server/db/userCart.json';

router.get('/', (req, res) => {
  fs.readFile(pathJSON, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  handler(req, res, 'add', pathJSON);
});
// localhost:3000/api/cart/123 // req.params.id
// localhost:3000/api/cart/?var1='sfsf'&var2='ada' // req.query
router.put('/:id', (req, res) => {
  handler(req, res, 'change', pathJSON);
});

router.delete('/:id', (req, res) => {
  handler(req, res, 'delete', pathJSON);
})

module.exports = router;
