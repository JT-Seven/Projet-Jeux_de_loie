"use strict"

const fs = require("fs");
require("remedial");

const traits = function(req, res, query) {

	let joueurs;
	let list_joueurs;
	let page_jeu_actif;
	let page_jeu_passif;
	let page_attente;
	let listeMembres;
	let contenu_fichier;



	page_jeu_actif = fs.readFileSync("modele_jeu_actif.html", "utf-8");
	page_jeu_passif = fs.readFileSync("modele_jeu_passif.html", "utf-8");
	page_attente = fs.readFileSync("modele_salle_attente.html", "utf-8");

	 contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
    listeMembres = JSON.parse(contenu_fichier);
	listeMembres.push(liste_joueurs);

	joueurs = fs.readFileSync("joueurs.json", "utf-8");
	list_joueurs = JSON.parse(joueurs);
	
	console.log(listeMembres);
	console.log(list_joueurs);


};

module.exports = traits;
