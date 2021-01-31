/*Некая сеть фастфуда предлагает несколько видов гамбургеров:
- Маленький (50 рублей, 20 калорий).
- Большой (100 рублей, 40 калорий).

Гамбургер может быть с одним из нескольких видов начинок (обязательно):
- С сыром (+10 рублей, +20 калорий).
- С салатом (+20 рублей, +5 калорий).
- С картофелем (+15 рублей, +10 калорий).

Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий)
и полить майонезом (+20 рублей, +5 калорий).
Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
*/


class Hamburger {
    constructor(size, listStuffing) {
        this.size = size;
        this.stuffing = listStuffing;
        this.topping = [];
    }

    addTopping(topping) { // Добавить добавку
        this.topping.push(topping);
    }
    removeTopping(topping) { // Убрать добавку
        const index = this.topping.indexOf(topping);
        if (index > -1) {
            this.topping.splice(index, 1);
        }
    }
    getToppings() { // Получить список добавок
        let resName = "";
        this.topping.forEach(el => {
            resName += el.name + ', ';
        });
        return "дополнительно - " + resName;
    }

    getSize() { // Узнать размер гамбургера
        return this.size.name;
    }
    getStuffing() { // Узнать начинку гамбургера
        let resName = "";
        this.stuffing.forEach(el => {
            resName += el.name + ', ';
        });
        return "начинка - " + resName;

    }
    calculatePrice() { // Узнать цену
        let resPrice = this.size.price;
        this.topping.forEach(el => {
            resPrice += el.price;
        });
        this.stuffing.forEach(el => {
            resPrice += el.price;
        });
        console.log(`Бургер ${this.getSize()}, ${this.getStuffing()} ${this.getToppings()} цена = ${resPrice}`);
    }
    calculateCalories() { // Узнать калорийность
        let resCalories = this.size.calories;
        this.topping.forEach(el => {
            resCalories += el.calories;
        });
        this.stuffing.forEach(el => {
            resCalories += el.calories;
        });
        console.log(`Бургер ${this.getSize()}, ${this.getStuffing()} ${this.getToppings()} калорий = ${resCalories}`);
    }
}

class SizeMini {
    constructor() {
        this.name = "Маленький";
        this.price = 50;
        this.calories = 20;
    }
}

class SizeMax {
    constructor() {
        this.name = "Большой";
        this.price = 100;
        this.calories = 40;
    }
}

class StuffingCheese {
    constructor() {
        this.name = "Сыр";
        this.price = 10;
        this.calories = 20;
    }
}

class StuffingSalad {
    constructor() {
        this.name = "Салат";
        this.price = 20;
        this.calories = 5;
    }
}

class StuffingPotato {
    constructor() {
        this.name = "Картошка";
        this.price = 15;
        this.calories = 10;
    }
}

class ToppingDressing {
    constructor() {
        this.name = "Приправа";
        this.price = 15;
        this.calories = 0;
    }
}

class ToppingMayonnaise {
    constructor() {
        this.name = "Майонез";
        this.price = 20;
        this.calories = 5;
    }
}

let size_mini = new SizeMini();
let size_max = new SizeMax();
let stuffing_cheese = new StuffingCheese();
let stuffing_salad = new StuffingSalad();
let stuffing_potato = new StuffingPotato();
let topping_dressing = new ToppingDressing();
let topping_mayonnaise = new ToppingMayonnaise();

let listStuffing = [stuffing_cheese, stuffing_salad];

let hamburger1 = new Hamburger(size_mini, listStuffing);
hamburger1.addTopping(topping_dressing);
hamburger1.calculatePrice();
hamburger1.calculateCalories();