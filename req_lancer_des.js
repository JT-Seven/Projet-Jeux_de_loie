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
	let random;
    // Récupération de la partie.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);
	
	position = partie.joueurs[partie.actif].position;
	if (partie.joueurs[partie.actif].passetour === 0) {
		random = Math.floor(Math.random() * 12) + 1;
		position = position + random;
		switch (position) {
			case 58:
				partie.joueurs[partie.actif].position = 1;
				partie.joueurs[partie.actif].script = 58;
				break;
			case 19:
				partie.joueurs[partie.actif].passetour = 2;
				partie.joueurs[partie.actif].script = 19;
				break;
			case 42:
				partie.joueurs[partie.actif].position = 30;
				partie.joueurs[partie.actif].script = 42;
				break;
			case 31:
				partie.joueurs[partie.actif].passetour = 1;
				partie.joueurs[partie.actif].script = 31;
				break;
			case 52:
				partie.joueurs[partie.actif].passetour = 2;
				partie.joueurs[partie.actif].script = 52;
				break;
			case 9:
			case 18:
			case 27:
			case 36:
			case 45:
			case 54:
				partie.joueurs[partie.actif].position = position + random;
				partie.joueurs[partie.actif].script = 9;
				break;
			default: 
				partie.joueurs[partie.actif].position = position;
				partie.joueurs[partie.actif].script = 0;
				break;
		}
		partie.joueurs[partie.actif].dernierNb = random;
	} else {
		partie.joueurs[partie.actif].passetour--;	
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
