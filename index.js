//Pour créer mais ne pas exécuter une requête de recherche

Model.find({ nom: "Leah" });

//Pour stocker la requête de recherche dans une variable pour une utilisation ultérieure 

var findQuery = YourModel.find({ nom: "Leah" });

//Pour trier un tableau 

yourArray.sort({ age: 1 }); // Ici: 1 pour l'ordre croissant et -1 pour l'ordre décroissant

//Pour limiter la taille d'un tableau 

yourArray.limit(5); // Retourne un tableau qui contient 5 élements

//Pour masquer certaines propriétés du résultat 

yourArray.select({ nom: 0, age: 1 }); // Ici: 0 signifie faux et donc masque la propriété nom; 1 signifie vrai donc la propriété age s'affiche

//Pour exécuter cette requête, vous pouvez soit

//Rappeler:

YourQuery.exec(function(err, docs) {
  //do something here
});

//Ou

//Promesse
YourQuery.exec.then(function(err, docs) {
  //do something here
});

//Enchaînez le tout

Person.find({ age: 55 })
  .sort({ nom: -1 })
  .limit(5)
  .select({ favoriteFoods: 0 })
  .exec(function(error, people) {
    //do something here
  });
