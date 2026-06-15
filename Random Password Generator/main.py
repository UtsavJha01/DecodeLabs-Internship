import random
import string

print("===========================================")
print("     WELCOME TO THE PASSWORD GENERATOR     ")
print("===========================================")

while True:
    try:
        length = int(input("Enter the desired password length (minimum 8 characters): "))
        if length < 8:
            print("Password length must be at least 8 characters. Please try again.")
            continue
        break
    except ValueError:
        print("Invalid input. Please enter a number.")

password=[
    random.choice(string.ascii_uppercase),
    random.choice(string.ascii_lowercase),
    random.choice(string.digits),
    random.choice("!@#$%&")
]
all_characters = string.ascii_letters + string.digits + "!@#$%&"
for _ in range(length - 4):
    password.append(random.choice(all_characters))
random.shuffle(password)

print("Generated Password: ", end="")
final_password = ''.join(password)
print(final_password)