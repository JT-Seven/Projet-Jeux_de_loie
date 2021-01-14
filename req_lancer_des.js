// Affiche la première page du site.

"use strict";

const fs = require("fs");
require("remedial");

const trait = function (req, res, query) {
    let page;
    let contenu;
    let partie;
    let marqueurs;
	let position;
    // Récupération de la partie.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);
	
	position = partie.joueurs[partie.actif].position;
	position = position + Math.floor(Math.random() * 12) + 1;
	switch (position) {
		case 58:
			partie.joueurs[partie.actif].position = 1;
			break;
		default: 
			partie.joueurs[partie.actif].position = position;
			break;
	}

    // Incrémentation de l'indice du joueur actif.

    partie.actif = (partie.actif + 1) % partie.joueurs.length;
    contenu = JSON.stringify(partie);
    fs.writeFileSync("partie.json", contenu, "utf-8");

    page = fs.readFileSync("./modele_jeu_passif.html", "utf-8");

    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);
    //envoi de la reponse

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.write(page);
    res.end();
};

module.exports = trait;
