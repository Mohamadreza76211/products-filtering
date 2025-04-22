# 🛍️ Products Filtering App

A modern React-based product filtering application with category and multi-option filters, a live shopping cart, and shareable filter URLs.

🌐 **[Live Demo](https://products-filtering.vercel.app/)**

---

## 📦 Features

- Filter products by:
  - Categories
  - Multi-option filters (checkboxes)
- URL updates automatically based on filters (easy sharing)
- Shopping cart with:
  - Add/remove quantity
  - Remove items
  - Total quantity and price calculation
- Modern UI with Material UI components
- Fully responsive design

---

## 🛠️ Getting Started

To run the project locally:

```bash
git clone https://github.com/yourusername/products-filtering.git
cd products-filtering
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
products-filtering/
│
├── public/                     # Static assets
├── src/
│   ├── components/             # UI Components (Sidebar, Filters, Products, Categories)
│   ├── data/                   # JSON mock data (products, categories, filters)
│   ├── Style/                  # SCSS styles
│   ├── App.js                  # Main app logic
│   └── index.js                # Entry point
├── README.md
├── package.json
```

---

## 🧠 Tech Stack

- React
- Material UI
- SCSS
- JSON mock data
- (Vite or Create React App depending on your setup)

---

## 🔗 Links

- Live Demo: [https://products-filtering.vercel.app/](https://products-filtering.vercel.app/)
- GitHub Repository: _(Add your repository link here)_

---

## ⚙️ Developer Notes

- All filters and categories are loaded dynamically from a local JSON file.
- Filter state is reflected in the URL, allowing easy sharing and restoring.
- Cart functionality is kept in-memory using React `useState` (not persisted).

---

## 👨‍💻 Author

This project is built for educational purposes and can be easily extended for real-world e-commerce use cases.
```

---

Let me know if you want a bilingual version or want to include deployment instructions (like Vercel).
