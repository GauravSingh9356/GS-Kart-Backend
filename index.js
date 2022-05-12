const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');

dotenv.config({
  path: './config.env',
});

const URI = process.env.URI;
mongoose.connect(URI, (err) => {
  if (err) console.log(err);
  else console.log('Connected to DB!');
});

const app = express();
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);

app.use(
  express.json({
    limit: '5mb',
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
