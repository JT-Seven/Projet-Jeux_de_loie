"use strict"

const afficher_liste_lobby = function (list_joueurs) {
	let html;
	let i;

	html = "<ul>";
	for (i = 0; i < lobby.joueurs.length; i++) {
		html += "<li>" + lobby.joueurs[i].pseudo + "</li>";
	}
	
	html += "<ul>";
	return html;
};

module.exports = afficher_liste_lobby;
