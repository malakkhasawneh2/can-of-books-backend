'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
const PORT = process.env.PORT || 3000;
//MongoDB
const mongoose = require('mongoose');

server.get('/test', (request, response) => {

  response.send('test request received')

})



let BookModel;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/information-Books');

  const bookSchema = new mongoose.Schema({
    title: String,
    imgUrl: String,
    description: String,
    status: String,
    ownerEmail: String


  });

  BookModel = mongoose.model('Book', bookSchema);
  //call one time then commit it to drevent rebited
    seedData();
}

async function seedData() {
  const CentralPark = new BookModel({
    title: 'Central Park',
    imgUrl:'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442582252l/26648244._SX318_.jpg',
    description: 'Alice and Gabriel have no memory of the night before…yet they won’t forget it any­time soon.New York, 8am. Alice, a young Parisian cop and Gabriel, American jazz pianist, wake up on a bench in Central park hand­cuffed to one another. They don’t know each other and have no memory of having met. The night before, Alice was at a party with her girl­friends on the Champs-Elysées and Gabriel was playing piano in a club in Dublin.Impossible? And yet… So many ques­tions leave them con­founded. How did they get them­selves into such a dan­gerous sit­u­a­tion? Whose blood has stained Alice’s shirt? Why is one bullet missing from her gun?Alice and Gabriel are left with no choice but to team up to figure out what is hap­pening to them and get back to their normal lives. What they are going to dis­cover will turn their lives upside down.',
    status: 'finished,free',
    ownerEmail: 'malakkhasawneh2@gmail.com'
  });

  const MonteCristo = new BookModel({
    title: 'The Count of Monte Cristo',
    imgUrl:'https://payload.cargocollective.com/1/6/222472/6354649/jhuusko_montecristo_Front_o.jpg',
    description: 'Thrown in prison for a crime he has not committed, Edmond Dantes is confined to the grim fortress of If. There he learns of a great hoard of treasure hidden on the Isle of Monte Cristo and he becomes determined not only to escape, but also to unearth the treasure and use it to plot the destruction of the three men responsible for his incarceration. Dumas’ epic tale of suffering and retribution, inspired by a real-life case of wrongful imprisonment, was a huge popular success when it was first serialized in the 1840s.',
    status: 'finished,free',
    ownerEmail: 'malakkhasawneh2@gmail.com'
  });
  const SherlockHolmes = new BookModel({
    title: 'A Study in Scarlet',
    imgUrl:'https://m.media-amazon.com/images/I/51JdmxJ8b7L.jpg',
    description: 'A Study in Scarlet" is the first published story of one of the most famous literary detectives of all time, Sherlock Holmes. Here Dr. Watson, who has just returned from a war in Afghanistan, meets Sherlock Holmes for the first time when they become flat-mates at the famous 221 B Baker Street. In "A Study in Scarlet" Sherlock Holmes investigates a murder at Lauriston Gardens as Dr. Watson tags along with Holmes while narratively detailing his amazing deductive abilities.',
    status: 'finished,free',
    ownerEmail: 'malakkhasawneh2@gmail.com'
  });


  await CentralPark.save();
  await MonteCristo.save();
  await SherlockHolmes.save();
}


//Routes
server.get('/', homeHandler);
server.get('/getBooks', getBooksHandler);

//Functions Handlers
function homeHandler(req, res) {

  res.send('Home Page');
}

function getBooksHandler(req, res) {
  //send fav books list (email)
  const email = req.query.email;
  BookModel.find({ ownerEmail: email }, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
