"use strict";

const fs = require('fs');
require('remedial');

const trait = function (req, req, query) {
	let page;
	let marqueurs;

	page = fs.readFileSync('modele_contacter.html','utf-8');

	marqueurs = {};
    marqueurs.prenom = "";
    marqueurs.nom = "";
    marqueurs.email = "";
    marqueurs.mesaage = "";

    page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};		
