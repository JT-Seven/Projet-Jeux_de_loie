//Génere le html d'un plateau a partir du json.
 
"use strict";

const fs = require("fs");
require('remedial');


const afficher_plateau = function (partie) {
	let i, j;
	let html
	let grille;
 	let x, y;
	let contenu;		
	let plateau;
	let trouve;
	let pion;
	grille = [];

	for(i = 0; i < 8; i++){
		grille.push([]);
		for(j = 0; j < 8; j++){
			grille[i].push({
				"case":"case",
				"nb": 64
			});
		}
 
	}
 
	contenu = fs.readFileSync("nbCases.json", "utf-8");
	plateau = JSON.parse(contenu);
	for (i = 0; i < 63; i++) {
		trouve = false;
		for (j = 0; j < partie.joueurs.length; j++) {
			if (i+1 === partie.joueurs[j].position) {
			trouve = true;
			pion = partie.joueurs[j].role;
			}
		}
			x = plateau.cases[i].x;
			y = plateau.cases[i].y;
		if (trouve === false) {
			grille[x][y].nb = i + 1;
		} else {
			grille[x][y].nb = pion;
		}
	}

	//Placer les elements de plateau.
 	
	html = [];
	html.push(`<div>`)
	console.log("grille.length: " + grille.length);
	for(i = 0; i < grille.length; i++){
		html.push(`<div class="nb-cases">`)
    	for(j = 0; j < grille.length; j++){
			html.push(`<img src = "cases/case${grille[i][j].nb}.png"/>`);
    	}
		html.push(`<div>`)
	}
	html.push(`<div>`)
 
	return html.join("");
};
 
module.exports = afficher_plateau;
