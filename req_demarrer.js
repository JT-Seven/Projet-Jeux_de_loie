// Provoque le début d'une partie avec toutes les personnes présentes dans le lobby.

"use strict";

const fs = require("fs");
require("remedial");

const trait = function (req, res, query) {
	let page;
	let contenu;
	let lobby;
	let partie;
	let i;
	let trouve;
	let marqueurs;

	// Récupération de la liste des gens déjà en attente.

	contenu = fs.readFileSync("lobby.json", "utf-8");
	lobby = JSON.parse(contenu);

	contenu = fs.readFileSync("_joueurs.json", "utf-8");
	partie = JSON.parse(contenu);

	// On change l'état de tous les joueurs à "EN JEU".

	for (i = 0; i < lobby.length; i++) {
		if (lobby[i].etat === "ATTENTE") {
			lobby[i].etat = "EN JEU";
			partie.joueurs.push(lobby[i].pseudo);
		}
	}

	contenu = JSON.stringify(lobby);
	fs.writeFileSync("lobby.json", contenu, "utf-8");

	contenu = JSON.stringify(partie);
	fs.writeFileSync("joueurs.json", contenu, "utf-8");

	// Création de la page à afficher.

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;

	page = fs.readFileSync("./modele_jeu.html", "utf-8");
	page = page.supplant(marqueurs);

	// Envoi de la réponse.

	res.writeHead(200, { "Content-Type": "text/html" });
	res.write(page);
	res.end();
};

module.exports = trait;
