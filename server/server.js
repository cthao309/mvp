const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

const Flashcard = require('../database/schema/flashcardSchema.js')

const app = express();
const port = 5555;

app.use(morgan('dev'));

app.use(cors())
app.use(bodyParser.json());
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
  let size;
  let body = req.body;

  Flashcard.count({}, (err, dataSize) => {
    if(err) {
      size = 0;
    } else {
      size = dataSize
    }
  });

  Flashcard.find({'question': body.question})
    .then(data => {
      if(data.length === 0) {
        console.log('it is not the db');

        body.id = size;
        let newCard = new Flashcard(body);

        newCard.save((err) => {
          if(err) return res.status(500).send(err);
          res.status(201).send('Card is created')
        })
      } else {
        console.log('data is in db => ', data)
        res.send(`You already created a card for "${data[0].question}"`)
      }
    })
    .catch(err => res.status(500).send(err))
});

app.put('/api/v1/', (req, res) => {
  let body = {...req.body};
  delete body.isDone;
  delete body.isEditing;
  delete body.oldLevel;

  Flashcard.update(
    {'_id': body._id},
    {
      id: body.id,
      question: body.question,
      answer: body.answer,
      difficulty: body.difficulty,
      completed: body.completed === 'false' ? false : true,
      owner: 'user'
    }, (err, msg) => {
      if(err) {
        res.status(500).send('error');
      } else {
        res.status(201).send('success');
      }
    })
});

app.delete('/api/v1/:id', (req, res) => {
  Flashcard.deleteOne({'_id': req.params.id}, (err, msg) => {
    if(err) {
      res.status(500).send('error')
    } else {
      res.status(201).send('success');
    }
  })
})

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})