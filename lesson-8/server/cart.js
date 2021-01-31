const addStat = require('./stats');

const add = (cart, req) => {
  cart.contents.push(req.body);
  addStat('added', req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {

  const find = cart.contents.find(el => el.id_product === +req.params.id);
  let changeStr = 'changed quantity: ' + find.quantity + ' => ';
  find.quantity += req.body.quantity;
  changeStr += find.quantity;
  addStat(changeStr, find);
  return JSON.stringify(cart, null, 4);
};

const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  cart.contents.splice(cart.contents.indexOf(find), 1);
  addStat('removed', find);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
