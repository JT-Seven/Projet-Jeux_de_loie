// Affiche la première page du site.

"use strict";
const afficher_plateau = require("./fct_afficher_plateau.js");
const fs = require("fs");
require("remedial");

const traits = function (req, res, query) {
    let page;
    let contenu;
    let partie;
    let i;
    let trouve;
    let marqueurs;

    // Récupération de la liste des gens déjà en attente.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);

    // Création de la page à afficher.

    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
    marqueurs.plateau = afficher_plateau(partie);
	//trouver le pseudo du joueur sur la page modele_jeu_actif.html
    if (partie.joueurs[partie.actif].pseudo === query.pseudo) {
		marqueurs.role = partie.joueurs[partie.actif].role;
		marqueurs.position = partie.joueurs[partie.actif].position;
        page = fs.readFileSync("modele_jeu_actif.html", "utf-8");
    } else {
		//trouver le pseudo du joueur sur la page jeu passif
		for (i = 0; i < partie.joueurs.length; i++) {
			//trouver le joueur sur la page
			if (partie.joueurs[i].pseudo === query.pseudo) {
				//affiche la valeur du lancer de des precedent (definit dans req_lancer_des)
				marqueurs.des = partie.joueurs[i].dernierNb;
				//affiche le script en fonction de la case et du role
				switch (partie.joueurs[i].script) {
					case 0:
						marqueurs.script = "test";
						break;
					case 9:
						if (partie.joueurs[i].role === "Snowden") {
							marqueurs.script = "Snowden a de la chance aujourd'hui";
						}
						break;
					case 58:
						marqueurs.script = "Notre personnage reste bloque pendant 1 tour";
						break;
					default:
						marqueurs.script = "";
						break;
					}
				}
			}
        page = fs.readFileSync("modele_jeu_passif.html", "utf-8");
    }   

    page = page.supplant(marqueurs);


    // Envoi de la réponse.

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.write(page);
    res.end();
};

module.exports = traits;
