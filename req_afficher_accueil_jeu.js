"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {

	let page;
	let marqueurs;

	page = fs.readFileSync('modele_accueil_jeu.html', 'UTF-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

module.exports = trait;
