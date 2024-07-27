document.getElementById('addExpense').addEventListener('click', addExpense);

function addExpense() {
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  if (description && amount && category) {
    const expense = {
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateUI();
    updateChart();
  } else {
    alert('Please fill out all fields');
  }
}

function updateUI() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const expensesList = document.getElementById('expenses');
  expensesList.innerHTML = '';

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.textContent = `${expense.description} - $${expense.amount.toFixed(2)} (${expense.category}) on ${expense.date}`;
    expensesList.appendChild(li);
  });
}

function updateChart() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const categories = ['Food', 'Transport', 'Entertainment', 'Others'];
  const amounts = categories.map(category => 
    expenses.filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const ctx = document.getElementById('expenseChart').getContext('2d');
  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Expenses',
        data: amounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Expenses Breakdown'
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  updateChart();
});
