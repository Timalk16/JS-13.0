  
'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function(str) {
  return !(str === null || str === '' || isNumber(str));
};

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),    
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    budgetMonthValue  = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue  = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');



function disabledInputText() {
  let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');

  inputText.forEach(element => {
    element.disabled = true;
  });
  start.style.display = 'none';
  cancel.style.display = 'block';
}

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
    if (salaryAmount.value === '') {
     start.disabled = true;
      return;
    }
    this.budget = +salaryAmount.value;
    this.getExpenses(); 
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
    disabledInputText();
    
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriodMoney();
  },
  addExpensesBlock: function() {    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(function(item){
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },  
  getExpenses: function() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(function(item){
      item.value = '';
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getAddIncome: function() {
    this.addIncome = [];    
    additionalIncomeItem.forEach((el) => {
      let elValue = el.value.trim();
      if (elValue !== '') {
        this.addIncome.push(elValue);
      }
    });   
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },
  getIncome: function() {
    incomeItems.forEach((el) => {
      let itemIncome = el.querySelector('.income-title').value;
      let cashIncome = el.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];

    }
  },
  getExpensesMonth: function() {
    let res = 0;   
    for (let key in this.expenses) {
      res += +this.expenses[key];
    }
    this.expensesMonth = res;
  },
  getBudget: function(){
    this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function() {
    
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0) {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function() {
    if (this.deposit) {

      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = prompt('Какая сумма заложена', '10');
      } while (!isNumber(this.moneyDeposit));
     
    }
  },
  calcPeriodMoney: function() {
    return (+this.budgetMonth) * +periodSelect.value;
  },
  changlePeriodSelect: function() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcPeriodMoney();
  },
  reset: function() {
    
    let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');
    let inputAll = document.querySelectorAll('input:not(.period-select)');
    start.disabled = false;   
  
    inputAll.forEach(element => {
      element.value = '';    
    });
  
    inputText.forEach(element => {
      element.disabled = false;
    });
  
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  
    start.style.display = 'block';
    cancel.style.display = 'none';
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    incomeItems.forEach((element, i) => {  
      if (i !== 0) {
        element.remove();
      }
    });
    incomePlus.style.display = 'block';
  
    expensesItems.forEach((element, i) => {  
      if (i !== 0) {
        element.remove();
      }
    });
    expensesPlus.style.display = 'block';
    depositCheck.checked = false;
  }
};


start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.changlePeriodSelect.bind(appData));
salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value !== '') {
    start.disabled = false;    
   } else {
    start.disabled = true;    
   }

});

// const typeOfMission = function() {
//   if (appData.getTargetMonth() >=0 ) {
//     console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяцев');
//   } else {
//     console.log('Цель не будет достигнута');
//   }
// };

for (let i = 0; i < appData.addExpenses.length; i++) {
  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);
}