total = 0

print("=== Expense Tracker ===")
print("Enter your expenses one by one.")
print("Type 'done' when finished.\n")

while True:
    expense = input("Enter expense amount: ")

    if expense.lower() == "done":
        break

    try:
        amount = float(expense)
        total = total + amount
    except ValueError:
        print("Please enter a valid number!")

print("\n=== Expense Summary ===")
print(f"Total Spent: ₹{total:.2f}")