// Affiche la première page du site.

"use strict";

const fs = require("fs");
require("remedial");

const trait = function (req, res, query) {
    let page;
	let contenu;
	let partie;
	let marqueurs;

	// Récupération de la partie.

	contenu = fs.readFileSync("partie.json", "utf-8");
	partie = JSON.parse(contenu);

	// Incrémentation de l'indice du joueur actif.

	partie.actif = (partie.actif + 1) % partie.joueurs.length;
	contenu = JSON.stringify(partie);
	fs.writeFileSync("partie.json", contenu, "utf-8");

    page = fs.readFileSync("./modele_jeu_passif.html", "utf-8");

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(page);
    res.end();
};

module.exports = trait;

