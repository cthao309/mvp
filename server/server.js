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
  console.log('POST (/api/v1/) => ', req.body)

  Flashcard.find({'question': req.body.question})
    .then(data => {
      if(data.length === 0) {
        console.log('it is not the db');

        let newCard = new Flashcard(req.body);
        newCard.save((err, cards) => {
          if(err) return res.status(500).send(err);
          res.status(201).send('successfully posted')
        })
      } else {
        console.log('data is in db => ', data)
        res.send(`You already created a card for "${data[0].question}"`)
      }
    })
})

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})