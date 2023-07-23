8//configuration et installation de mongoose

const mongoose = require("mongoose");

//creation de model de personne


const personSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] },
  });
  
  const Person = mongoose.model("Person", personSchema);
  
  module.exports = Person;