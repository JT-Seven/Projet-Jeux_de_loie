"use strict"

const fs = require("fs");
require("remedial");

const afficher_liste_lobby = require("./fct_afficher_liste_lobby.js");
const afficher_boutton_demarrer = require("./fct_afficher_boutton_demarrer.js");

const traits = function(req, res, query) {
	//declaration des variables
	let page;
	let marqueurs;
	let lobby;
	let trouve;
	let i;
	let joueurs;

	//on lit le fichier lobby.json et on met son contenu dans la variable joueurs, puis on la transforme en object
	//et on met l'objet dans la variable lobby
	joueurs = fs.readFileSync("lobby.json","utf-8");
	lobby = JSON.parse(joueurs);

	//on cherche si notre joueur est dans la liste lobby 
	i = 0;
	trouve = false;
	while (i < lobby.length && trouve == false) {
		if (lobby[i].pseudo  === query.pseudo) {
			trouve = true;
		} else {
			i++;
		}

	}
	
	//si il n'est pas dans la liste on dit qu'il y a une erreur
	if (trouve === false) {
		console.log("ERREUR : On n'a pas trouve le joueur dans la liste.");
	}
	
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	
	//si le joueur est en ATTENTE on montre de nouveau la meme page, sinon on affiche la page jeu passif
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
