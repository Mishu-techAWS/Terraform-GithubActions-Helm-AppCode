const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://mongo:27017/testdb', { useNewUrlParser: true });

const NameSchema = new mongoose.Schema({ name: String });
const Name = mongoose.model('Name', NameSchema);

app.use(bodyParser.json());

app.post('/name', async (req, res) => {
  const { name } = req.body;
  await new Name({ name }).save();
  res.send({ status: 'Saved' });
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
