"use strict"

const afficher_liste_lobby = function (lobby) {
	let html;
	let i;
	console.log(lobby);

	html = "<ul>";
	for (i = 0; i < lobby.length; i++) {
		if (lobby[i].etat === "ATTENTE") {
			html += "<li>" + lobby[i].pseudo + "</li>";
		}
	}
	
	html += "<ul>";
	return html;
};

module.exports = afficher_liste_lobby;
