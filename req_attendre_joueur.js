"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_joueurs = require("./fct_afficher_liste_lobby.js");

const traits = function(req, res, query) {
	let page;
	let marqueurs;
	let _joueurs;
	let joueurs;
	let list_joueurs;
	let page_jeu_actif;
	let page_jeu_passif;
	let page_attente;
	let trouve;
	let i;
	let Role;
	let chaine;
	let _joueur;
	let participant;

	joueurs = fs.readFileSync("joueurs.json", "utf-8");
	list_joueurs = JSON.parse(joueurs);
	i = 0;
	trouve = false;

	while (i < list_joueurs.participant.length && trouve == false) {
		if (list_joueurs.participant[i].pseudo  === query.pseudo) {
			trouve = true;
		} else {
			i++;
		}

	if (trouve === false) {
		console.log("ERREUR : On n'a pas trouve le joueur dans la liste.");
		}
	}

	if(list_joueurs.participant.length === 2) {
		page_jeu_passif = fs.readFileSync("modele_jeu_passif.html","utf-8");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page_jeu_passif);
		res.end();
	
	} else {


 	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.liste = afficher_liste_joueurs(list_joueurs);
	
	page_attente = fs.readFileSync("modele_salle_attente.html", "utf-8");
	page_attente = page_attente.supplant(marqueurs);
	
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page_attente);
	res.end();
	}
};

module.exports = traits; 
