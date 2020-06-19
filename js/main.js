"use srtict";


//проверка на число
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//проверка на текст
let isText = function(str) {
    return !(str === null || str === '' || isNumber(str));
  };


let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');
    periodAmount = document.querySelector('.period-amount');
    incomeItem = document.querySelectorAll('.income-items');

  

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
      appData.budget = +salaryAmount.value;
      console.log('salaryAmount.value: ', salaryAmount.value);


      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getBudget();
      appData.getInfoDeposit(); 
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget(); 

      appData.showResult();
    },
    showResult: function() {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.ceil(appData.budgetDay);
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = appData.calcPeriod();
      });
    },
    addExpensesBlock: function() {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
      }
    },
    getExpenses: function() {
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    addIncomeBlock: function () {
      let cloneIncomeItem = incomeItem[0].cloneNode(true);
      incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItem =document.querySelectorAll('.income-items');
      if(incomeItem.length === 3) {
        incomePlus.style.display = 'none';
      }
    },
    getIncome: function (paras) {
      incomeItem.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
        }
      });

      for(let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
      }
    },
    getAddExpenses: function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function () {
      additionalIncomeItem.forEach(function (item) {
        let itemValue = item.value.trim();
        if (item.value !== '') {
          appData.addIncome.push(itemValue);
        }
      });
    },
    getExpensesMonth: function() { // Функция возвращает сумму всех обязательных расходов за месяц
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
          }
        
    },
    getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
        
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;

    },
    getTargetMonth: function() {    // Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления 
        return targetAmount.value / appData.budgetMonth;
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
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
              } while (!isNumber(appData.percentDeposit));
        
              do {
                appData.moneyDeposit = +prompt('Какая сумма заложена', 10000);
              } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
};

if (salaryAmount.value === '') {
  start.setAttribute("disabled", true);
}

salaryAmount.addEventListener('input', function() {
  if (salaryAmount.value === '') {
    start.setAttribute("disabled", true);
  } else {
    start.removeAttribute("disabled");
  }
});

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});



//let access = function() {
    //if (appData.getTargetMonth() >=0 ) {
       // console.log('Цель будет достигнута за ' + Math.ceil(appData.//getTargetMonth()) + ' месяцев');
    //  } else {
      //  console.log('Цель не будет достигнута');
     // }
//};

for (let i = 0; i < appData.addExpenses.length; i++) {
    appData.addExpenses[i] = appData.addExpenses[i].trim();
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
  }






