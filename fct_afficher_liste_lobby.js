"use strict"

const afficher_liste_joueurs = function (list_joueurs) {
	let html;
	let i;

	html = "<ul>";
	for (i = 0; i < list_joueurs.participant.length; i++) {
		html += "<li>" + list_joueurs.participant[i].pseudo + "</li>";
	}
	
	html += "<ul>";
	return html;
};

module.exports = afficher_liste_joueurs;
