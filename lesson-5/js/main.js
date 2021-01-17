const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',

        searchLine: "",

        cart: [],
        isVisibleCart: false,
        imgCart: 'https://placehold.it/50x100',
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            const productOfCart = this.cart.find(el => el.id_product === product.id_product);

            if (productOfCart) {
                productOfCart.quantity++;
            } else {
                const prod = Object.assign({ quantity: 1 }, product);
                this.cart.push(prod);
            }
        },

        getTotalPrice() {
            let totalPrice = 0;
            for (let product of this.cart) {
                totalPrice += product.price * product.quantity;
            }
            return totalPrice;
        },

        removeProductOfCart(product) {
            this.cart.splice(this.cart.indexOf(product), 1);
        },

        decreaseProductOfCart(product) {
            if (product.quantity !== 1) {
                product.quantity--;
            } else {
                this.removeProductOfCart(product);
            }
        },

        increaseProductOfCart(product) {
            product.quantity++;
        },

        filterGoods(product) {
            return (new RegExp(this.searchLine, "i")).test(product.product_name);
        }
    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});