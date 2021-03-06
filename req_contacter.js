"use strict";

const fs = require("fs");
require('remedial');

const trait = function(req, res, query) {
	let page;
	let contenu;
	let listeMembres;
	let i;
	let trouve;
	let marqueurs;
	let contenu_contacte;
	let listeContacte;

// On lit le compte existant.
		contenu = fs.readFileSync('membres.json','utf-8');
		listeMembres = JSON.parse(contenu);
		
		contenu_contacte = fs.readFileSync('contacte.json','utf-8');
		listeContacte = JSON.parse(contenu_contacte);

		trouve = false;
		i = 0;
		while (i < listeMembres.length && trouve === false) {
			if (listeMembres[i].pseudo === query.pseudo && listeMembres[i].nom === query.nom && listeMembres[i].adresse === query.email) {
				trouve = true;
			}

			i++;
		}
		//On enregistre les information ainsi que le message entrer par l'utilsateur.
		if (trouve === true) {
			
			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {}
			marqueurs.pseudo = query.pseudo;
			marqueurs.nom = query.nom;
			marqueurs.email = query.email;
			marqueurs.message = query.message;
			listeContacte[listeContacte.length] = marqueurs;
			page = page.supplant(marqueurs);

			contenu_contacte = JSON.stringify(listeContacte);
        	fs.writeFileSync("contacte.json", contenu_contacte , 'utf-8');
		}
//On affiche un mesage d'erreur si le compte n'existe pas .
		if (trouve === false) {
			
			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
            marqueurs.nom = query.nom;
            marqueurs.email = query.email;
            marqueurs.message = query.message;
            marqueurs.confirmer = "";
			marqueurs.erreur = "ERREUR : ce compte n'existe pas"
			page = page.supplant(marqueurs);
		
		} else {

			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {},
            marqueurs.pseudo = query.pseudo;
            marqueurs.erreur = "";
            marqueurs.nom = query.nom;
            marqueurs.email = query.email;
            marqueurs.message = query.message;
            marqueurs.confirmer = "Votre message a bien ??t?? envoyer nous vous recontacterons ult??rieurement";
			page = page.supplant(marqueurs);
		}
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(page);
			res.end();
		
};

module.exports = trait;
