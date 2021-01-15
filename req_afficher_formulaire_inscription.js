//=========================================================================
// Traitement de "req_afficher_formulaire_inscription"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let rng;

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');
	
	
	rng = Math.floor(Math.random() * 1000000) + 1;

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
 	marqueurs.age = "";
	marqueurs.number = rng;
	marqueurs.password2 = "";
	marqueurs.nom = "";
	marqueurs.adresse = "";
	marqueurs.password = "";

	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
