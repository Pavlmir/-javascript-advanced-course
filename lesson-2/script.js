class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item card">
                    <h3 class="card-title">${this.title}</h3>
                    <p class="card-text">${this.price}</p>
                    <button class="btn btn-secondary">Купить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML("afterbegin", listHtml);
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

    addGoods(item, count, InBasket) {
        let addCount = count - item.count;
        item.count = item.count + addCount;
        if (InBasket === false) {
            this.goods.push(item);
        }
        if (item.count === 0) {
            this.goods.pop(item);
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

}

class BasketItem {
    constructor(objGood, count) {
        this.title = objGood.title;
        this.price = objGood.price;
        this.count = 0;
    }

    render() {
        return `<div class="goods-basket card">
                    <h3 class="card-title">${this.title}</h3>
                    <p class="card-text">${this.price}</p>
                </div>`;
    }

}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalCost();
