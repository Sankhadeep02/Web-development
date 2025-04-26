# 📱 Telephone Number Validator (Indian Numbers)

This project validates Indian phone numbers based on specific rules.  
It checks if the input matches valid Indian mobile number formats — optionally allowing spaces, hyphens, or a country code prefix (+91/91).

---

## 🚀 Live Demo

👉 [Check it out here!](https://sankhadeep02.github.io/Web-development/Telephone-Number-Validator/)  

---

## ✨ Features

- Validates 10-digit Indian mobile numbers
- Supports optional formatting:
  - With or without country code (`+91`, `91`)
  - With or without spaces or hyphens
- Provides feedback for incorrect formats

---

## 📋 Validation Rules

- Must be a 10-digit number
- Must start with **6**, **7**, **8**, or **9**
- Optional:
  - **+91** or **91** country code at the beginning
  - Single space or hyphen between number groups

✅ Valid examples:
- `9876543210`
- `98765-43210`
- `98765 43210`
- `+91 9876543210`
- `91-9876543210`

❌ Invalid examples:
- `1234567890` (starts with 1)
- `98765432` (too short)
- `98765--43210` (double hyphens)
- `98765  43210` (double spaces)

---

## 🛠️ Technology Stack

- HTML
- CSS
- JavaScript (Vanilla)

---

## 🧑‍💻 Author

Built with ❤️ by Sankhadeep 
