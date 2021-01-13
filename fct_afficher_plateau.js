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
	grille = [];

	for(i = 0; i < 8; i++){
		grille.push([]);
		for(j = 0; j < 8; j++){
			grille[i].push({
				"case":"case",
				"nb": null
			});
		}
 
	}
 
	contenu = fs.readFileSync("nbCases.json", "utf-8");
	plateau = JSON.parse(contenu);
	for (i = 0; i < 63; i++) {
		x = plateau.cases[i].x;
		y = plateau.cases[i].y;
		grille[x][y].nb = i + 1;
	}

	//Placer les elements de plateau.
 	
	html = [];
	html.push(`<div>`)
	console.log("grille.length: " + grille.length);
	for(i = 0; i < grille.length; i++){
		html.push(`<div class="nb-cases">`)
    	for(j = 0; j < grille.length; j++){
			html.push(`<img src = "case.png"/>`);
			html.push(grille[i][j].nb);
    	}
		html.push(`<div>`)
	}
	html.push(`<div>`)
 
	return html.join("");
};
 
module.exports = afficher_plateau;
