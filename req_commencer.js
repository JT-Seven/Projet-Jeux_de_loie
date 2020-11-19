"use strict"

const fs = require("fs");

const traits = function(req, res, query) {
	let page;
    let joueurs;
    let list_joueurs;
    let page_jeu_actif;
    let page_jeu_passif;
    let page_attente;
    let listeMembres;
    let contenu_fichier;
	
		console.log(query);   	
		page = fs.readFileSync("modele_salle_attente.html","utf-8");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();

};

module.exports = traits;
