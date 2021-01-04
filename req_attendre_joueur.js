"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_lobby = require("./fct_afficher_liste_lobby.js");
const afficher_boutton_demarrer = require("./fct_afficher_boutton_demarrer.js");

const traits = function(req, res, query) {
	let page;
	let marqueurs;
	let list_lobby;
	let trouve;
	let i;
	let joueurs;

	joueurs = fs.readFileSync("lobby.json","utf-8");
	list_lobby = JSON.parse(joueurs);
	i = 0;
	trouve = false;

	while (i < list_lobby.length && trouve == false) {
		if (list_lobby[i].pseudo  === query.pseudo) {
			trouve = true;
		} else {
			i++;
		}

	}
	
	if (trouve === false) {
		console.log("ERREUR : On n'a pas trouve le joueur dans la liste.");
	}
	
	if (list_lobby[i].etat === "ATTENTE") {
	console.log(list_lobby);
	//	marqueurs.demarrer = afficher_boutton_demarrer(list_lobby, query.pseudo);
		marqueurs.liste = afficher_liste_lobby(list_lobby);
	
		page = fs.readFileSync("./modele_salle_attente.html", "utf-8");
	} else if (lobby[i].etat === "EN JEU") {
		page = fs.readFileSync("./modele_jeu_passif.html", "utf-8");
	}

	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();
};
module.exports = traits; 
