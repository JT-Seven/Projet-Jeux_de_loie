"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_joueurs = require("./fct_afficher_liste_lobby.js");

const traits = function(req, res, query) {
	let page;
    let joueurs;
    let list_joueurs;
    let page_jeu_actif;
    let page_jeu_passif;
    let page_attente;
    let listeMembres;
    let contenu_fichier;
	let marqueurs;


	list_joueurs = [];

	joueurs = fs.readFileSync("joueurs.json", "UTF-8");
	if (typeof joueurs === 'string' && joueurs !== "") {
	list_joueurs = JSON.parse(joueurs);
	}
	
	list_joueurs.push(query.pseudo);
	
	joueurs = JSON.stringify(list_joueurs);
	fs.writeFileSync("joueurs.json", joueurs, "utf-8");


	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.liste = afficher_liste_joueurs(list_joueurs);

	page = fs.readFileSync("modele_salle_attente.html","utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();

};

module.exports = traits;
