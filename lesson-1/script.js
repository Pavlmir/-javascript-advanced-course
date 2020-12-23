const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (obj, currency = "руб.") => {
    return `<div class="goods-item card"><h3 class="card-title">${obj.title}</h3>
    <p class="card-text">${obj.price} ${currency}</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join(" ");
}

renderGoodsList(goods);