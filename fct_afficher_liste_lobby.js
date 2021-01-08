"use strict"

const afficher_liste_lobby = function (lobby) {
	let html;
	let i;

	html = "<ul class='pseudo'>";
	for (i = 0; i < lobby.length; i++) {
		if (lobby[i].etat === "ATTENTE") {
			html += "<li>" + lobby[i].pseudo + "</li>";
		}
	}
	
	html += "<ul>";
	return html;
};

module.exports = afficher_liste_lobby;
