"use strict";

const fs = require("fs");
require('remedial');

const trait = function (req, res, query) {
	let page;
    let question_secrete = [];
    let marqueurs;
    let joueurs;
    let contenu;
    let i;
    let trouve;
	let contenu_;
	let listeMembres;
    let j;
	let trouver;
    
	
	contenu = fs.readFileSync("question_secrete.json", "utf-8");
   	question_secrete = JSON.parse(contenu);
	
	contenu_ = fs.readFileSync('membres.json','utf-8');
	listeMembres = JSON.parse(contenu_);

   	i = 0;
    trouve = false;
	while (i < question_secrete.length && trouve === false) {
        if (question_secrete[i].pseudo === listeMembres.pseudo) {
        	if (question_secrete[i].question === query.question) {
        		if (question_secrete[i].reponse === query.reponse) {
            		trouve = true;
				}
			}
        }
        i++;
    }

	j = 0;
	while (j < listeMembres.length && trouver === false) {
		if (listeMembres[j].pseudo === query.pseudo) {
			trouver = true;
		} 
		j++;
	}
	
	if (trouver === true) {
		if (trouve === true) {
			page = fs.readFileSync('modele_formulaire_inscription.html','utf-8');

			marqueurs = {};
			marqueurs.erreur_secrete = "ERREUR : ce compte existe déja";
			marqueurs.confirmation_secrete = "";
			marqueurs.pseudo = "";
			marqueurs.password = "";
			marqueurs.password2 = "";
			marqueurs.adresse = "";
			marqueurs.nom = "";
			marqueurs.age = "";
			marqueurs.erreur = "";
			marqueurs.reponse = "";
			page = page.supplant(marqueurs);

		} else {
			page = fs.readFileSync('modele_formulaire_inscription.html','utf-8');

			marqueurs = {};
			marqueurs.erreur_secrete = "";
			marqueurs.confirmation_secrete = "Votre réponse a bien été envoyé !";
			marqueurs.pseudo = query.pseudo;
			marqueurs.password = query.password;
			marqueurs.password2 = query.password2;
			marqueurs.adresse = query.adresse;
			marqueurs.nom = query.nom;
			marqueurs.age = query.age;
			marqueurs.erreur = "";
			marqueurs.civil = "";
			marqueurs.reponse = query.reponse;
			page = page.supplant(marqueurs);

			joueurs = {};
			joueurs.pseudo = query.pseudo;
			joueurs.question = query.question;
			joueurs.reponse = query.reponse;
            page = page.supplant(joueurs);
			question_secrete[question_secrete.length] = joueurs;

			contenu = JSON.stringify(question_secrete)
			fs.writeFileSync("question_secrete.json", contenu,"utf-8");
    	}
	} 

	if (trouver === false) {
		if (trouve === false) {
			
		    page = fs.readFileSync('modele_formulaire_inscription.html','utf-8');

            marqueurs = {};
            marqueurs.erreur_secrete = "";
            marqueurs.confirmation_secrete = "Votre réponse a bien été envoyé !";
            marqueurs.pseudo = query.pseudo;
            marqueurs.password = query.password;
            marqueurs.password2 = query.password2;
            marqueurs.adresse = query.adresse;
            marqueurs.nom = query.nom;
            marqueurs.age = query.age;
            marqueurs.erreur = "";
            marqueurs.civil = "";
            marqueurs.reponse = query.reponse;
            page = page.supplant(marqueurs);

            joueurs = {};
            joueurs.pseudo = query.pseudo;
            joueurs.question = query.question;
            joueurs.reponse = query.reponse;
            question_secrete[question_secrete.length] = joueurs;
            page = page.supplant(joueurs);

            contenu = JSON.stringify(question_secrete)
            fs.writeFileSync("question_secrete.json",contenu,"utf-8");

		
		} else {
			page = fs.readFileSync('modele_formulaire_inscription.html','utf-8');

            marqueurs = {};
            marqueurs.erreur_secrete = "ERREUR : ce compte existe déja";
            marqueurs.confirmation_secrete = "";
            marqueurs.pseudo = "";
            marqueurs.password = "";
            marqueurs.password2 = "";
            marqueurs.adresse = "";
            marqueurs.nom = "";
            marqueurs.age = "";
            marqueurs.erreur = "";
            marqueurs.reponse = "";
            page = page.supplant(marqueurs);
  
		}
	}
		
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(page);
			res.end();
};

//-------------------------------------------------------------------

module.exports = trait;
