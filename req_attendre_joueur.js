"use strict"

const fs = require("fs");
require("remedial");

const trait = function(req, res, query) {

	let joueurs;
	let list_joueurs;
	let page_jeu_actif;
	let page_jeu_passif;
	let page_attente;
	
	page_jeu_actif = fs.readFileSync("modele_jeu_actif.html", "utf-8");
	page_jeu_passif = fs.readFileSync("modele_jeu_passif.html", "utf-8");
	page_attente = fs.readFileSync("modele_salle_attente.html", "utf-8");


	joueurs = fs.readFileSync("joueurs.json", "utf-8");
	list_joueurs = JSON.parse(joueurs);

	if (list_joueurs.length >= 5) {
		if (list_joueurs[0] === ) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(page_jeu_actif);
			res.end();
		}
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page_jeu_passif);
		res.end();
	}

};

module.exports = traits;
