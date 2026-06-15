const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const savingEl = document.getElementById("saving");
const messageEl = document.getElementById("message");

const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactions = transactions.map(t => ({
    ...t,
    amount: Number(t.amount) || 0
}));

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI() {

    let income = 0;
    let expense = 0;

    transactionList.innerHTML = "";

    transactions.forEach((t, index) => {

        const amount = Number(t.amount) || 0;

        if (t.type === "income") {
            income += amount;
        } else {
            expense += amount;
        }

        const li = document.createElement("li");
        li.classList.add("transaction");

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${t.title}</strong>
                <small>${t.category}</small><br>
                <small>${t.date || ""}</small>
            </div>

            <div>
                <span class="${t.type === "income" ? "credit" : "debit"}">
                    ${t.type === "income" ? "+ ₹" : "- ₹"}${amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${index})">
                    🗑️
                </button>
            </div>
        `;

        transactionList.appendChild(li);
    });

    const balance = income - expense;

    let savingPercent = 0;

    if (income > 0) {
        savingPercent = ((balance / income) * 100).toFixed(1);

        if (savingPercent < 0) {
            savingPercent = 0;
        }
    }

    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;
    balanceEl.textContent = `₹${balance}`;
    savingEl.textContent = `${savingPercent}%`;

    if (income === 0) {
        messageEl.textContent =
            "Add income to begin tracking.";
    }
    else if (savingPercent >= 30) {
        messageEl.textContent =
            "🎉 Excellent! You're managing your money very well.";
    }
    else if (savingPercent >= 15) {
        messageEl.textContent =
            "👍 Good! Try saving a little more.";
    }
    else {
        messageEl.textContent =
            "⚠️ You're spending too much. Reduce unnecessary expenses.";
    }

    saveData();
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const title =
        document.getElementById("title").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const category =
        document.getElementById("category").value;

    if (!title || amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid transaction.");
        return;
    }

    transactions.unshift({
        title,
        amount,
        type,
        category,
        date: new Date().toLocaleString()
    });

    form.reset();

    updateUI();
});

window.deleteTransaction = function(index) {

    const confirmDelete = confirm(
        "Delete this transaction?"
    );

    if (!confirmDelete) return;

    transactions.splice(index, 1);

    updateUI();
};

resetBtn.addEventListener("click", () => {

    const confirmReset = confirm(
        "This will delete ALL transactions permanently. Continue?"
    );

    if (!confirmReset) return;

    transactions = [];

    localStorage.removeItem("transactions");

    updateUI();

    alert("All transaction data has been reset.");
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light Mode";
}

updateUI();