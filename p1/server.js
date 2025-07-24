const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());

const customers = [
  { id: 1, name: "Alice", address: "101 Main Street" },
  { id: 2, name: "Bob", address: "303 Sub Street" },
  { id: 3, name: "Tin", address: "s3988418 RMIT" },
];

const orders = [
  { customer_id: 1, product_id: 1, quantity: 2 },
  { customer_id: 1, product_id: 2, quantity: 3 },
  { customer_id: 3, product_id: 1, quantity: 5 },
  { customer_id: 3, product_id: 3, quantity: 2 },
];

const products = [
  { id: 1, name: "Laptop", price: 500.0, sell_off: true, percent: 10.0 },
  { id: 2, name: "Phone", price: 350.0, sell_off: false },
  { id: 3, name: "Keyboard", price: 130.0, sell_off: true, percent: 40.0 },
  { id: 4, name: "Tablet", price: 680.0, sell_off: false },
];

// Route: GET /customers
app.get("/customers", (req, res) => {
  res.json(customers);
});

// Route: GET /customers/:id
app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === id);
  if (customer) {
    const customerOrders = orders
      .filter((o) => o.customer_id === id)
      .map((o) => ({ product_id: o.product_id, quantity: o.quantity }));
    res.json({ ...customer, orders: customerOrders });
  } else {
    res.status(404).json({ msg: "not found" });
  }
});

// Route: GET /customers/:id/total
app.get("/customers/:id/total", (req, res) => {
  const id = parseInt(req.params.id);
  const customerOrders = orders.filter((o) => o.customer_id === id);

  let total = 0;
  customerOrders.forEach((o) => {
    const product = products.find((p) => p.id === o.product_id);
    if (product) {
      let price = product.price;
      if (product.sell_off) {
        price = price * (1 - product.percent / 100);
      }
      total += price * o.quantity;
    }
  });

  res.json({ total_price: total });
});

// Route: catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
