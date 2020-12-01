"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_joueurs = require("./fct_afficher_liste_lobby.js");

const trait = function(req, res, query) {
	let page;
	let joueurs;
	let marqueurs;
	let list_joueurs;
	let page_jeu_actif;
	let page_jeu_passif;
	let page_attente;
	let trouve;
	let i;
	
	page_attente = fs.readFileSync("modele_salle_attente.html", "utf-8");

	joueurs = fs.readFileSync("joueurs.json", "utf-8");
	list_joueurs = JSON.parse(joueurs);

	i = 0;
	trouve = false;

	while (i < list_joueurs.length && trouve == false) {
		if (list_joueurs[i] === query.pseudo) {
			trouve = true;
		} else {
			i++;
		}
	}

	if (trouve === false) {
		console.log("ERREUR : On n'a pas trouve le joueuer dans la liste.")
	}

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.liste = afficher_liste_joueurs(list_joueurs);
	if (list_joueurs.length >= 2) {
		if (list_joueurs[0].joueurs === query.pseudo) {
			//res.writeHead(200, {"Content-Type": "text/html"});
			//res.write(page_jeu_actif);
			//res.end();
		}
		//res.writeHead(200, {"Content-Type": "text/html"});
		//res.write(page_jeu_passif);
		//res.end();
	}
	page_attente = page_attente.supplant(marqueurs);
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page_attente);
	res.end();

};

module.exports = trait;
