const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render(goods_list) {

        // `<div class="goods-item card">
        //     <h3 class="card-title">${this.title}</h3>
        //     <p class="card-text">${this.price}</p>
        //     <button class="btn btn-secondary btn-buy">Купить</button>
        // </div>`;

        let div = document.createElement('div');
        div.classList.add("goods-item");
        div.classList.add("card");

        let h3 = document.createElement('h3');
        h3.classList.add("card-title");
        h3.innerHTML = `${this.title}`;

        let p = document.createElement('p');
        p.classList.add("card-text");
        p.innerHTML = `${this.price}`;

        let button = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-secondary");
        button.classList.add("btn-buy");
        button.innerHTML = "Купить";
        button.addEventListener('click', (e) => {
            cart_list.addGoods(this);
            cart_list.render();
        });

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);

        goods_list.appendChild(div);

    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this._getGoods()
            .then(data => {
                this.goods = [...data];
                this.render()
            })
    }

    _getGoods() {
        return fetch(`${API_URL}/catalogData.json`)
            .then(text => text.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let goods_list = document.querySelector('.goods-list');
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            goodItem.render(goods_list);
        });
    }
    totalCost() {
        let reducer = (sum, current) => sum + current.price;
        let result = this.goods.reduce(reducer, 0);

        let resultHtml = `<div class="goods-item card">
                            <p>Итоговая стоимость ${result}</p>
                        </div>`;

        return document.querySelector('.goods-list').insertAdjacentHTML("afterend", resultHtml);
    }
}

class BasketList {

    constructor() {
        this.goods = [];
    }

    countBasketPrice() {
        let reducer = (sum, current) => sum + current.price * current.count;
        let result = this.goods.reduce(reducer, 0);
        return result;
    }

    addGoods(goodItem) {
        let cartItem = this.searchGoods(goodItem.title);
        if (cartItem === "") {
            cartItem = new BasketItem(goodItem, 1);
            this.goods.push(cartItem);
            let cart_count = document.querySelector('.cart-count');
            if (cart_count) {
                cart_count.innerHTML = this.render();
            }
            else {
                document.querySelector('.flex-header').insertAdjacentHTML("afterbegin",
                    `<div class="cart-count">
                    ${this.render()}
                </div>`);
            }
        }
        else {
            alert("Товар уже добален в корзину.")
        }
    }

    delGoods(item) {
        let ind = this.goods.indexOf(item);
        if (ind != -1) {
            this.goods.splice(ind, 1);
        }
    }

    searchGoods(title) {
        let result = "";
        this.goods.forEach(el => {
            if (el.title === title) {
                result = el;
            }
        });
        return result;
    }

    getInfoGoods() {
        let resCount = 0;
        let resName = ' ';
        this.goods.forEach(el => {
            resCount += el.count;
            resName += el.title + ' ';
        });
        return {
            resCount: resCount,
            resName: resName
        };
    }

    getListGoods() {
        let resultHtml = "";
        this.goods.forEach(cartGood => {
            resultHtml = resultHtml + `<div>${cartGood.title} ${cartGood.price} ${cartGood.count}</div>`;
        });
        return resultHtml;
    }

    render() {
        return `<div>Количество товаров в корзине: ${this.goods.length}</div>`;
    }


}

class BasketItem {
    constructor(objGood, count) {
        this.title = objGood.title;
        this.price = objGood.price;
        this.count = 0;
    }

    render() {
        let item_cart = document.querySelector('.flex-header');
        return item_cart.insertAdjacentHTML("beforebegin",
            `<div class="goods-basket card">
                    <h3 class="card-title">${this.title}</h3>
                    <p class="card-text">${this.price}</p>
                </div>`
        );
    }

}

const goods_list = new GoodsList();
goods_list.render();
goods_list.totalCost();

const cart_list = new BasketList();

let modal = document.querySelector('.modal');
let cart_button = document.querySelector('.cart-button');
cart_button.addEventListener('click', (e) => {
    modal.style.display = "block";
    document.querySelector('.modal').innerHTML =
        `<div class="modal-content">
            <div class="modal-header">
                <h3>Список товаров в корзине</h3>
                <span class="close">×</span>
            </div>
            <div class="modal-body">
                <div class="modal-all">
                    <div class="modal-tab">
                        <div class="modal-tab-head">
                            <div class="modal-content-sub-name">Наименование товара</div>
                            <div class="modal-content-sub-price">Цена</div>
                            <div class="modal-content-sub"></div>
                            <div class="modal-content-sub-count">Количество</div>
                            <div class="modal-content-sub"></div>
                        </div>
                        <div class="modal-tab-row">
                            <div class="modal-content-sub-name">vsdv</div>
                            <div class="modal-content-sub-price">2</div>
                            <button class="modal-content-sub btn-buy-continue btn btn-warning">-</button>
                            <input class="modal-content-sub-count" type="text" size="10" value="0" />
                            <button class="modal-content-sub btn-buy-continue btn btn-warning">+</button>
                        </div>
                    </div>
                </div>
                ${cart_list.getListGoods()}
            </div>
            <div>
                <button class="btn-buy-continue btn btn-warning">Продолжить покупку</button>
            </div>

        </div>`;
    let span = document.querySelector(".close");
    span.addEventListener('click', (e) => {
        modal.style.display = "none";
    });
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}