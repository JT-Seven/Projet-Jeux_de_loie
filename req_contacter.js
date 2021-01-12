"use strict";

const fs = require("fs");
require('remedial');

const trait = function(req, res, query) {
	let page;
	let contenu;
	let signale;
	let list_message;
	let i;
	let trouver;

	contenu = fs.readFileSync('contacte.json','utf-8');
	list_message = JSON.parse(contenu);

	i = 0;
	trouver = false;

	while (i < list_message.length && trouver === false) {
		if (list_message[i].prenom === query.prenom) {
			trouver = true;
			signale = {};
			signale.prenom = query.prenom;
			signale.nom = query.nom;
			signale.email = query.email;
			signale.message = query.message;
			list_message[list_message.length] = signale;

    		contenu = JSON.stringify(list_message);

  		    fs.writeFileSync("contacte.json", contenu, 'utf-8');

		} else if (list_message[i].prenom !== query.pseudo) {
			trouver = true;
            signale = {};
            signale.prenom = query.prenom;
            signale.nom = query.nom;
            signale.email = query.email;
            signale.message = query.message;
            list_message[list_message.length] = signale;

            contenu = JSON.stringify(list_message);

            fs.writeFileSync("contacte.json", contenu, 'utf-8');
			
		}
		i++;
	}
	
	

	page = fs.readFileSync('modele_contacter.html','utf-8');

	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};

module.exports = trait;
