// Création du HTML pour le bouton de démarrage du jeu.
"use strict";

const afficher_boutton_demarrer = function (lobby, pseudo) {
  let html;  

  if (lobby.length >= 3 && lobby[0].pseudo === pseudo) {
	  html = '<a href="/req_demarrer?pseudo=' + pseudo + '"><button>Démarrer</button></a>'    ;
 } else {
	 html = "";
 }

 return html;
};

module.exports = afficher_boutton_demarrer;

