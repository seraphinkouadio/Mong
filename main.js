//configuration et installation de mongoose

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./person');


//connexion à la bd

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.error('Erreur de connexion à MongoDB :', error));


// Créer et enregistrer un enregistrement d'un modèle

const createAndSavePerson = function(done) {
  const sieKoffi = new Person({name: "Sie Koffi", age: 22, favoriteFoods: ["attiéké", "riz", "orange"]});

  sieKoffi.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

// Créer de nombreux enregistrements avec model.create()
const arrayOfPeople = [
  {name: "Frank", age: 74, favoriteFoods: ["Chocolat"]},
  {name: "Obité", age: 76, favoriteFoods: ["Garba"]},
  {name: "Aline", age: 78, favoriteFoods: ["Placali"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

// Utiliser model.find() pour rechercher dans votre base de données
const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

// Utiliser model.findOne() pour renvoyer un seul document correspondant
const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Utiliser model.findById() pour rechercher votre base de données par _id
const personId = '1234567890'; // Remplacez par l'ID réel d'une personne
const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

//Effectuez des mises à jour classiques en exécutant Rechercher, Modifier, puis Enregistrer

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // méthode findById() pour trouver une personne par id avec le parametre personId comme clé de recherche 

  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Méthode array.push() pour ajouter "hamburger" à la liste des favoriteFoods
    
    person.favoriteFoods.push(foodToAdd);

    // Mise à jour de Person à l'interieur du find callback - save() 
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
//Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

//Supprimer un document à l'aide de model.findByIdAndRemove

const removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

//Supprimer de nombreux documents avec model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

