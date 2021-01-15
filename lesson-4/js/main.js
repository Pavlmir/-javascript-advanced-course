'use strict';

const regExpName = /[a-zа-яё]+/i; // буквы от a-z, а-я
const regExpPhone = /\+7\(\d{3}\)\d{3}-\d{4}/; // +7 (три цифры) три цифры - 4 цифры
const regExpEmail = /[a-z]+[a-z0-9]+\.?-?[a-z0-9]+@[a-z]+\.[a-z]+/i;

document.querySelectorAll('input').forEach(element =>
    element.addEventListener('change', event => {
        const element = event.target;
        switch (event.target.name) {
            case 'name':
                validation(element, regExpName);
                break;
            case 'phone':
                validation(element, regExpPhone);
                break;
            case 'email':
                validation(element, regExpEmail);
                break;
        }

    }));

document.querySelector('button').addEventListener('click', event => {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]');
    const phone = document.querySelector('input[name="phone"]');
    const email = document.querySelector('input[name="email"]');
    const text = document.querySelector('textarea');

    if (validation(name, regExpName) && validation(phone, regExpPhone) &&
        validation(email, regExpEmail) && validationMessage(text)) {

        sendMessage(
            name.value,
            phone.value,
            email.value,
            text.value
        );
    }
})

const validOk = element => {
    element.classList.add('valid-ok');
    element.classList.remove('valid-err');
    document.querySelector(`label[name='${element.name}-error']`).classList.add('hide');
}

const validErr = element => {
    element.classList.add('valid-err');
    element.classList.remove('valid-ok');
    document.querySelector(`label[name='${element.name}-error']`).classList.remove('hide');
}

const validation = (element, regExp) => {

    if (element.value.match(regExp) && element.value.match(regExp)[0] === element.value) {
        validOk(element);
        return true;
    } else {
        validErr(element);
        return false;
    }
}

const validationMessage = (element) => {

    if (element.value.length > 0) {
        validOk(element);
        return true;
    } else {
        validErr(element);
        return false;
    }
}

const sendMessage = (name, phone, email, message) => {
    //Отправка сообщения
    console.log(name, '\n', phone, '\n', email, '\n', message);
}