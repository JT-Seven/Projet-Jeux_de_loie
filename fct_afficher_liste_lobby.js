"use strict"

const afficher_liste_joueurs = function (joueurs) {
	let html;
	let i;

	html = "<ul>";
	console.log(joueurs[0]);
	for (i = 0; i < joueurs.length; i++) {
		html += "<li>" + joueurs[i] + "</li>";
	}
	
	html += "<ul>";
	return html;
};

module.exports = afficher_liste_joueurs;
