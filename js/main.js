  
'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isText = function(str) {
  return !(str === null || str === '' || isNumber(str));
};

const start = document.getElementById('start'),
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
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
    let expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItems = document.querySelectorAll('.income-items');



function disabledInputText() {
  let inputText = document.querySelectorAll('[type="text"]:not(.result-total)');

  inputText.forEach(element => {
    element.disabled = true;
  });
  start.style.display = 'none';
  cancel.style.display = 'block';
}

class AppData  {
  constructor () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit =  0;
  this.moneyDeposit =  0;
  this.budget =  0;
  this.budgetDay =  0;
  this.budgetMonth =  0;
  this.expensesMonth =  0;
};

start () {
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
  
};

showResult () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriodMoney();
};
addExpensesBlock () {    
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelectorAll('input').forEach(function(item){
    item.value = '';
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
}; 
getExpenses () {
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  }, this);
};
addIncomeBlock () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelectorAll('input').forEach(function(item){
    item.value = '';
  });
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};
getAddIncome () {
  this.addIncome = [];    
  additionalIncomeItem.forEach((el) => {
    let elValue = el.value.trim();
    if (elValue !== '') {
      this.addIncome.push(elValue);
    }
  });   
};
getAddExpenses () {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this);
};
getIncome () {
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
};
getExpensesMonth () {
  let res = 0;   
  for (let key in this.expenses) {
    res += +this.expenses[key];
  }
  this.expensesMonth = res;
};
getBudget (){
  this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
getTargetMonth () {
  
  return targetAmount.value / this.budgetMonth;
};
getStatusIncome () {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay <= 0) {
    return ('Что то пошло не так');
  }
};
getInfoDeposit () {
  if (this.deposit) {

    do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
    } while (!isNumber(this.percentDeposit));

    do {
      this.moneyDeposit = prompt('Какая сумма заложена', '10');
    } while (!isNumber(this.moneyDeposit));
   
  }
};
calcPeriodMoney () {
  return (+this.budgetMonth) * +periodSelect.value;
};
changlePeriodSelect () {
  periodAmount.textContent = periodSelect.value;
  incomePeriodValue.value = this.calcPeriodMoney();
};
reset () {
  
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
};
eventListeners () {
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock);
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  periodSelect.addEventListener('input', this.changlePeriodSelect.bind(this));
  salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '') {
      start.disabled = false;    
     } else {
      start.disabled = true;    
     }
  
    });
  };
}

const appData = new AppData();
appData.eventListeners();



