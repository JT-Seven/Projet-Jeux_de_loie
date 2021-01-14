"use strict";

const fs = require("fs");
require('remedial');

const trait = function(req, res, query) {
	let page;
	let contenu;
	let listeMembres;
	let i;
	let trouver;
	let marqueurs;


		contenu = fs.readFileSync('contacte.json','utf-8');
		listeMembres = JSON.parse(contenu);
		
		trouve = false;
		i = 0;
		while (i < listeMembres.length && trouve === false) {
			if (listeMembres[i].pseudo === query.pseudo) {
			}
			if (listeMembres[i].nom === query.nom) {
				trouve = true;
			}
			if (listeMembres[i].email === query.email) {
            	trouve = true;
			}
			if (listeMembres[i].message === query.message) {
                trouve = true;
 	       }
			i++;
		}
		
		if (trouve === true) {
			
			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {},
			marqueurs.pseudo = query.pseudo;
			marqueurs.erreur = "";		
			marqueurs.nom = query.pseudo;
			marqueurs.email = query.pseudo;
			marqueurs.message = query.pseudo;
			marqueurs.confirmer = "Votre message a bien été envoyer nous vous recontacterons ultérieurement";
			listeMembres[listeMembres.length] = marqueurs;
			page = page.supplant(marqueurs);

			contenu = JSON.stringify(listeMembres);

        	fs.writeFileSync("contacte.json", contenu , 'utf-8');
		}

		if (trouve === false) {
			
			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {};
			marqueurs.pseudo = query.pseudo;
            marqueurs.nom = query.pseudo;
            marqueurs.email = query.pseudo;
            marqueurs.message = query.pseudo;
            marqueurs.confirmer = "";
			marqueurs.erreur = "ERREUR : ce compte n'existe pas"
			page = page.supplant(marqueurs);
		
		} else {

			page = fs.readFileSync('modele_contacter.html','utf-8');
			
			marqueurs = {},
            marqueurs.pseudo = query.pseudo;
            marqueurs.erreur = "";
            marqueurs.nom = query.pseudo;
            marqueurs.email = query.pseudo;
            marqueurs.message = query.pseudo;
            marqueurs.confirmer = "";
			page = page.supplant(marqueurs);

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(page);
			res.end();
		}
};

module.exports = trait;
