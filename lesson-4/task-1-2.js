'use strict';

let text =
    `One: 'Hi Mary.' Two: 'Oh, hi.'
    One: 'How are you doing?'
    Two: 'I'm doing alright.How about you ? '
        One: 'Not too bad. The weather is great isn't it ? '
        Two: 'Yes. It's absolutely beautiful today.'
    One: 'I wish it was like this more frequently.'
    Two: 'Me too.'
    One: 'So where are you going now?'
    Two: 'I'm going to meet a friend of mine at the department store.'
    One: 'Going to do a little shopping?'
    Two: 'Yeah, I have to buy some presents for my parents.'
    One: 'What's the occasion ? '
        Two: 'It's their anniversary.'
    One: 'That's great.Well, you better get going.You don't want to be late.'
    Two: 'I'll see you next time.'
    One: 'Sure. Bye.'`;

/* 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
Придумать шаблон, который заменяет одинарные кавычки на двойные.
*/
console.log("1. - " + text.replace(/\'/g, '\"'));

// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
console.log("2. - " + text.replace(/'/g, (subStr, pos) => {
    if (/\w/.test(text[pos - 1]) && /\w/.test(text[pos + 1])) { // если одинарная кавычка между двумя буквами то оставляем ее как есть
        return '\'';
    } else {
        return '\"';
    }
}));