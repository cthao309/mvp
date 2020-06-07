const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 5555;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/:level', (req, res) => {
  console.log('GET (/api/v1/:level) =>', req.body)
})

app.post('/api/v1/:level', (req, res) => {
  console.log('POST (/api/v1/:level) => ', res.status)
})

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})