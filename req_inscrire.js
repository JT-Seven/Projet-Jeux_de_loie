//=========================================================================
// Traitement de "req_inscrire"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 15/09/2020
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let marqueurs;
	let page;
	let nouveauMembre;
	let contenu_fichier;
	let listeMembres;
	let i;
	let trouve;
	let rng;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while (i < listeMembres.length && trouve === false) {
		if (listeMembres[i].pseudo === query.pseudo) {
				trouve = true;
		}
		if (listeMembres[i].password2 === query.password2) {
				trouve = true;
		}
		if (listeMembres[i].password === query.password) {
				trouve = true;
		}
		if (listeMembres[i].adresse === query.adresse) {
				trouve = true;
		}
		if (listeMembres[i].age === query.age) {
				trouve = true;
		}
		if (listeMembres[i].number === query.number) {
				trouve = true;
		}
		i++;
	}

	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

	if (trouve === false) {
		nouveauMembre = {};
		nouveauMembre.pseudo = query.pseudo;
		nouveauMembre.password = query.password;
		nouveauMembre.password2 = query.password2;
		nouveauMembre.adresse = query.adresse;
		nouveauMembre.age = query.age;
		nouveauMembre.number = query.number;
		listeMembres[listeMembres.length] = nouveauMembre;

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	}


	// ON RENVOIT UNE PAGE HTML 

	if (trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

		page = fs.readFileSync('modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.number = query.number;
		marqueurs.password = query.password;
		page = page.supplant(marqueurs);
		
	}

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
