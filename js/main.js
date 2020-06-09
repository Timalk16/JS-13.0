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
    amountNumberAll = amount1 + amount2,
    showTypeOf = function(data) {
        console.log(data, typeof(data));
    };

    


//Задание 2

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);

console.log('Период равен: ',period, 'месяцев');
console.log('Цель заработать ', mission, 'рублей');

 let lowerExpenses = addExpenses.toLocaleLowerCase();

 console.log(lowerExpenses.split(', '));






let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay > 600, budgetDay < 1200) {
       return ('У вас средний уровень дохода');
    } else if (budgetDay <= 600) {
       return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
       return ('Что то пошло не так');
    }
};

console.log(getStatusIncome());

let  getExpensesMonth = function() { // Функция возвращает сумму всех обязательных расходов за месяц
    let expensesTotal =  amount1 + amount2;
    return expensesTotal;
};

getExpensesMonth();

let getAccumulatedMonth = function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
    let AccumulatedMonth =  money - amountNumberAll;
    return AccumulatedMonth;
};

getAccumulatedMonth();

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {    // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления 
    let TargetMonth =  mission / accumulatedMonth;
    return TargetMonth;
};

let targetMonth = getTargetMonth();

console.log('Цель будет достигнута за ', targetMonth , 'месяцев' );

getTargetMonth();

let getAccumulatedDay = function() {
    let budgetDay =  Math.floor(accumulatedMonth / 30);
    return budgetDay;
};

var budgetDay = getAccumulatedDay();

getAccumulatedDay();

console.log('budgetDay: ', budgetDay);







