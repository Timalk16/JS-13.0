'use srtict';

//Задание 1
let money = +prompt('Ваш месячный доход?'),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 500000,
    period = 5,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    amountNumberAll = amountNumber1 + amountNumber2,
    budgetMonth = moneyNumber - amountNumberAll,
    missionCompleted = Math.ceil((mission / budgetMonth));



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

