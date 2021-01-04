"use strict";

const afficher_liste_lobby = require("./fct_afficher_liste_lobby.js");
const afficher_boutton_demarrer = require("./fct_afficher_boutton_demarrer.js");

const traits = function(req, res, query) {
	const fs = require("fs");
	require("remedial");
	let page;
	let lobby = [];
	let marqueurs;
	let joueurs;
	let contenu;
	let i;
	let trouve;

	contenu = fs.readFileSync("lobby.json", "utf-8");
	if (contenu === "") {
		lobby = [];
	} else {	
	lobby = JSON.parse(contenu);
	}

	i = 0;
	trouve = false;
	while (i < lobby.length && trouve === false) {
		if (lobby[i] === query.pseudo) {
			trouve = true;
		}
		i++;
	}
	

	if (trouve === false) {
	joueurs = {};
	joueurs.pseudo = query.pseudo;
	joueurs.etat = "ATTENTE";
	lobby.push(joueurs);
	contenu = JSON.stringify(lobby)
	fs.writeFileSync("lobby.json",contenu,"utf-8");
	}

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.liste = afficher_liste_lobby(lobby);
	marqueurs.demarrer = afficher_boutton_demarrer(lobby, query.pseudo);

	page = fs.readFileSync("./modele_salle_attente.html","utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();

};

module.exports = traits;
