const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose= require("mongoose")


const dotenv = require("dotenv");
dotenv.config();
const design = require("path");
app.use(express.static(design.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.set("view engine", "ejs");


mongoose.connect(process.env.DATABASE_URI)
.then(()=>{
    console.log(`database connected successfully`);
    
})
.catch((err)=>{
    console.log(err);
    
})
const ProductRoute= require('./routers/product.routes')
app.use( "/api/v1",ProductRoute)



const products = [
  {
    productName: "Wireless Bluetooth Headphones",
    productPrice: 89.99,
    productQuantity: 24,
    productDescription:
      "Noise-cancelling headphones with 30-hour battery life and premium sound quality",
  },
  {
    productName: "Stainless Steel Water Bottle",
    productPrice: 24.99,
    productQuantity: 150,
    productDescription:
      "Insulated 1L bottle that keeps drinks cold for 24 hours or hot for 12 hours",
  },
  {
    productName: "Mechanical Gaming Keyboard",
    productPrice: 129.99,
    productQuantity: 18,
    productDescription:
      "RGB backlit keyboard with cherry MX switches and customizable macro keys",
  },
  {
    productName: "Organic Cotton T-Shirt",
    productPrice: 29.99,
    productQuantity: 87,
    productDescription:
      "Sustainable, fair-trade cotton t-shirt available in multiple colors and sizes",
  },
  {
    productName: "Portable Power Bank",
    productPrice: 49.99,
    productQuantity: 42,
    productDescription:
      "20000mAh fast-charging power bank with dual USB ports and LED display",
  },
  {
    productName: "Ceramic Coffee Mug Set",
    productPrice: 34.99,
    productQuantity: 56,
    productDescription:
      "Set of 4 handcrafted ceramic mugs with unique glaze patterns",
  },
  {
    productName: "Fitness Activity Tracker",
    productPrice: 79.99,
    productQuantity: 33,
    productDescription:
      "Water-resistant smartwatch with heart rate monitor and sleep tracking",
  },
  {
    productName: "Yoga Mat Premium",
    productPrice: 44.99,
    productQuantity: 61,
    productDescription:
      "Eco-friendly non-slip mat with alignment markers and carrying strap",
  },
  {
    productName: "Desk Lamp with Wireless Charger",
    productPrice: 64.99,
    productQuantity: 29,
    productDescription:
      "Adjustable LED lamp with built-in Qi wireless charging pad",
  },
  {
    productName: "Backpack Laptop Bag",
    productPrice: 74.99,
    productQuantity: 38,
    productDescription:
      "Water-resistant backpack with padded laptop compartment and USB charging port",
  },
];

// app.get(path, callback)
app.get("/", (req, res) => {
  // res.send({
  //     name:"pampam",
  //     class:4
  // })

  let path = __dirname;
  console.log(path);

  // res.sendFile(path+"/public/header.jpg")
  res.sendFile(path + "/public/index.html");
//   res.send(400).json()
});

app.get("/ejs", (req, res) => {
  res.render("index", {
    name: "pampam",
    gender: "female",
    numbers: [23, 45, 78, 98, 57, 86],
  });
});

app.get("/products", (req, res) => {
  res.render("product", { products });
});

app.get("/add-product", (req, res) => {
  res.render("addProduct");
});

app.post("/add-product", (req, res) => {
  const { productName, productPrice, productDescription, productQuantity } =
    req.body;
  console.log(req.body);

  products.push(req.body);
  res.render("product", { products });
  // res.send('product added')
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;

  products.splice(id, 1);
  res.render("product", { products });
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  res.render("editProduct");
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { productName, productPrice, productDescription, productQuantity } =
    req.body;

  products.splice(id, 1, req.body);

  res.render("product", { products });
});

// app.listen(port, callback)
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started on port ${process.env.PORT}`);
  }
});




//cluster->Database->collections->documents
