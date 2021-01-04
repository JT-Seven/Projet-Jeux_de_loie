"use strict";

//const afficher_liste_lobby = require("./fct_afficher_liste_lobby.js");

const traits = function(req, res, query) {
const fs = require("fs");
require("remedial");
	let page;
	let lobby = [];
	let listlobby;
	let marqueurs;
	let joueurs;
	let list_joueurs;

joueurs = {};
joueurs.pseudo = query.pseudo;
lobby.push(joueurs);
lobby = JSON.stringify(fs.writeFileSync("lobby.json",lobby,"utf-8"));
	
	
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
//	marqueurs.liste = afficher_liste_lobby(list_joueurs);

	page = fs.readFileSync("modele_salle_attente.html","utf-8");
	page = page.supplant(marqueurs);

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(page);
	res.end();

};

module.exports = traits;
