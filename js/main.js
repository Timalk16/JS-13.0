'use srtict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
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
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            for (let i = 0; i < 2; i++) {
                let state = prompt('Введите обязательную статью расходов?');
                let amount;

                do {
                    amount= prompt('Во сколько это обойдется?');
                    appData.expenses[state] = +amount;
                  } while (!isNumber(amount));
        
            }
    },
    getExpensesMonth: function() { // Функция возвращает сумму всех обязательных расходов за месяц
        let sum = 0;
    
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
          }
            return sum;
        
    },
    getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
        
        return appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function() {    // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления 
        
        return appData.misison / appData.budgetMonth;
        
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600, appData.budgetDay < 1200) {
           return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600) {
           return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
           return ('Что то пошло не так');
        }
    },
    getAccumulatedDay: function() {
        let budgetDay =  Math.floor(appData.accumulatedMonth / 30);
        return budgetDay;
    },

};

appData.asking();
appData.expensesMonth = appData.getExpensesMonth(); 
appData.budgetMonth = appData.getBudget();
appData.budgetDay = appData.budgetMonth / 30;


    showTypeOf = function(data) {
        console.log(data, typeof(data));
    };

//Задание 2

showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);


let access = function() {
    if (appData.getTargetMonth() >=0 ) {
        console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
      } else {
        console.log('Цель не будет достигнута');
      }
};


console.log(appData.getStatusIncome(appData.budgetDay));
console.log('Период равен: ',appData.period, 'месяцев');
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}







