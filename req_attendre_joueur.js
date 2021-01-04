"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_lobby = require("./fct_afficher_liste_lobby.js");
const afficher_boutton_demarrer = require("./fct_afficher_boutton_demarrer.js");

const traits = function(req, res, query) {
	let page;
	let marqueurs;
	let lobby;
	let trouve;
	let i;
	let joueurs;

	joueurs = fs.readFileSync("lobby.json","utf-8");
	lobby = JSON.parse(joueurs);
	i = 0;
	trouve = false;
	while (i < lobby.length && trouve == false) {
		if (lobby[i].pseudo  === query.pseudo) {
			trouve = true;
		} else {
			i++;
		}

	}
	
	if (trouve === false) {
		console.log("ERREUR : On n'a pas trouve le joueur dans la liste.");
	}
	
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;

	if (lobby[i].etat === "ATTENTE") {
		marqueurs.demarrer = afficher_boutton_demarrer(lobby, query.pseudo);
		marqueurs.liste = afficher_liste_lobby(lobby);
	
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
