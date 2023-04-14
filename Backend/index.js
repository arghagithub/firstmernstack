const connectToMongo=require('./db');
const express = require('express')
const cors=require('cors');

connectToMongo();

const app = express()
const port = 80

app.use(express.json());
app.use(cors());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/items',require('./routes/items'));
app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`)
})