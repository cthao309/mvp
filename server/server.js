const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const Flashcard = require('../database/schema/flashcardSchema.js')

const app = express();
const port = 5555;

app.use(morgan('dev'));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/:level', (req, res) => {
  console.log('GET (/api/v1/:level) =>', req.params.level);

  Flashcard.find({'difficulty': req.params.level}, (err, data) => {
    if(err) res.status(400).send(err);
    res.status(200).send(data)
  })
})

app.post('/api/v1/', (req, res) => {
  console.log('POST (/api/v1/) => ', res.status)

  let body = {
    question: 'Bonjour',
    answer: 'hello',
    difficulty: 'easy',
    completed: false
  }

  let newCard = new Flashcard(body);
  newCard.save((err, cards) => {
    if(err) return console.log(err);
    return console.log('Successful save')
  })

})

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})