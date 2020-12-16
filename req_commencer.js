"use strict";

const afficher_liste_joueurs = require("./fct_afficher_liste_lobby.js");

const traits = function(req, res, query) {
const fs = require("fs");
require("remedial");
	let page;
	let contenu;
	let _joueurs; 
    let i;
	let chaine;
	let list_joueurs;
	let marqueurs;

contenu = fs.readFileSync("joueurs.json","utf-8");

// supprime le contenu du joueurs.json (utilisé pour une nouvelle partie).

if(JSON.parse(contenu).role.length === 0 ) {
	fs.writeFileSync("joueurs.json", "", "utf-8");
	contenu = fs.readFileSync("joueurs.json","utf-8");
	}

//utilisation du fichier tamplate.

if(contenu !== "") {  
	list_joueurs =  JSON.parse(contenu); 

//utilisation de joueur.json pour le 2e joueurs.

	} else {
	list_joueurs = JSON.parse(fs.readFileSync("_joueurs.json","utf-8"));//utilisation de _joueurs.json pour 1e 
	}
	
	// on ajoute le pseudo, le role et l'etat dans la liste.
	
	i = Math.floor(Math.random() * list_joueurs.role.length);

	_joueurs = {};	
	_joueurs.pseudo = query.pseudo;
	_joueurs.etat = "Attente";
	_joueurs.role = list_joueurs.role[i];
	
	list_joueurs.role.splice(i, 1);
	list_joueurs.participant.push(_joueurs);	
	
	// Enregistrement des information dans le fichier joueurs.json.

    chaine = JSON.stringify(list_joueurs);
    fs.writeFileSync("joueurs.json",chaine,"utf-8");

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.liste = afficher_liste_joueurs(list_joueurs);

	page = fs.readFileSync("modele_salle_attente.html","utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();

};

module.exports = traits;
