"use strict";
const fs = require('fs');
const moment = require('moment');
const statsFile = './server/db/stats.json';

const addStat = (action, product) => {
    fs.readFile(statsFile, 'utf-8', (err, data) => {
        //TODO Не совсем понимаю, что делать, если происходит ошибка при записи/чтении файла статистики
        let newRecord = {id: product.id_product, name: product.product_name, action: action, time: moment().format("DD.MM.YYYY HH:mm:ss")};
        let stat =[];
        if (!err){
            stat = JSON.parse(data);
            stat.push(newRecord);
        }else{
            if (err.errno !== -4058){
                console.log(err);
                return;
            }else{
                stat = [newRecord];
            }
        }
        fs.writeFile(statsFile, JSON.stringify(stat, null, 4), (err) => {
            if (err){
                console.log(err);
            }
        })
    })
}

module.exports = addStat;

