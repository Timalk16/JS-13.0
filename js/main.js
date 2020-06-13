'use srtict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
    money = +prompt('Ваш месячный доход?');
        do  {
        money = +prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };
  
  start();




let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    period: 5,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpensestoLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

    },
    getExpensesMonth: function() { // Функция возвращает сумму всех обязательных расходов за месяц
        let sum = 0;
    
        for (let i = 0; i < 2; i++) {
                
            
            expenses[i] = prompt('Введите обязательную статью расходов?');
    
            amount += +prompt('Во сколько это обойдется');
    
            while (!isNumber(amount)) {
                amount = +prompt('Во сколько это обойдется');
            }
            sum += amount;
            
    
        }
            console.log(amount);
            return sum;
        
    },
    getAccumulatedMonth: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
        let AccumulatedMonth =  money - appData.asking;
        return AccumulatedMonth;
    },
    getTargetMonth: function() {    // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления 
        let TargetMonth =  appData.mission / appData.accumulatedMonth;
        return TargetMonth;
        
    },
    getStatusIncome: function() {
        if (budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (budgetDay > 600, budgetDay < 1200) {
           return ('У вас средний уровень дохода');
        } else if (budgetDay <= 600) {
           return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (budgetDay < 0) {
           return ('Что то пошло не так');
        }
    },
    getAccumulatedDay: function() {
        let budgetDay =  Math.floor(appData.accumulatedMonth / 30);
        return budgetDay;
    },

};



    //expenses1 = prompt('Введите обязательную статью расходов?'),
    //amount1 = +prompt('Во сколько это обойдется?'),
    //expenses2 = prompt('Введите обязательную статью расходов?'),
    //amount2 = +prompt('Во сколько это обойдется?'),
    //amountNumberAll = amount1 + amount2,
    showTypeOf = function(data) {
        console.log(data, typeof(data));
    };

//Задание 2

showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);

let amount;

console.log(appData.addExpenses.length);

console.log('Период равен: ',appData.period, 'месяцев');
console.log('Цель заработать ', appData.mission, 'рублей');


let accumulatedMonth = appData.getAccumulatedMonth();
let targetMonth = appData.getTargetMonth();


if (targetMonth < 0) {
    console.log('Цель не будет достигнута');
} else if(targetMonth > 0) {
    console.log('Цель будет достигнута за ', targetMonth , 'месяцев' );
}




let budgetDay = appData.getAccumulatedDay();



console.log('budgetDay: ', budgetDay);


console.log(appData.getStatusIncome(budgetDay));







