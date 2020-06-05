//Задание 1
let money = 50000;
let income = 'фриланс';
let addExpenses = 'интернет, такси, коммуналка, продукты';
let deposit = true;
let mission = 500000;
let period = 5;

//Задание 2
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен: ',period, 'месяцев');
console.log('Цель заработать ', mission, 'рублей');

 let lowerExpenses = addExpenses.toLocaleLowerCase();

 console.log(lowerExpenses.split(', '));

 let budgetDay = money / 30;
 
 console.log('budgetDay: ', budgetDay);




