'use srtict';

//Задание 1
let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 500000;
let period = 5;
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let amount2 = prompt('Во сколько это обойдется?');
let moneyNumber = Number.parseInt(money);
let amountNumber1 = Number.parseInt(amount1);
let amountNumber2 = Number.parseInt(amount2);
let amountNumberAll = amountNumber1 + amountNumber2;
let budgetMonth = moneyNumber - amountNumberAll;
let missionCompleted = Math.ceil((mission / budgetMonth));



//Задание 2
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен: ',period, 'месяцев');
console.log('Цель заработать ', mission, 'рублей');

 let lowerExpenses = addExpenses.toLocaleLowerCase();

 console.log(lowerExpenses.split(', '));

 let budgetDay = Math.floor(budgetMonth / 30);
 
 console.log('budgetDay: ', budgetDay);

 console.log('budgetMonth: ', budgetMonth);

 console.log('Цель будет достигнута за ', missionCompleted, 'месяцев' );

 console.log('missionCompleted: ', missionCompleted);

 if (budgetDay >= 1200) {
     console.log('У вас высокий уровень дохода');
 } else if (budgetDay > 600, budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
 } else if (budgetDay <= 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
 } else if (budgetDay < 0) {
    console.log('Что то пошло не так');
 }

