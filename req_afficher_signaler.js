"use strict";

const fs = require('fs');
require('remedial');

const trait = function (req, res, query) {
	let page;
	let marqueurs;

	page = fs.readFileSync('modele_contacter.html','utf-8');
	
	marqueurs = {};
	marqueurs.pseudo = "";
	marqueurs.erreur = "";
	marqueurs.nom = "";
	marqueurs.email = "";
	marqueurs.confirmer = "";
	marqueurs.message = "";

	page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};	

module.exports = trait;
