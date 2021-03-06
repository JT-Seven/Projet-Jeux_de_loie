//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 09/11/2018
//=========================================================================

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_inscrire = require("./req_inscrire.js");
const req_connecter = require("./req_connecter.js");
const req_statique = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");
const req_commencer = require("./req_commencer.js");
const req_attendre_joueur  = require("./req_attendre_joueur.js");
const req_retour_acceuil = require("./req_retour_acceuil.js");
const req_demarrer = require("./req_demarrer.js");
const req_lancer_des = require("./req_lancer_des.js");
const req_attendre_tour = require("./req_attendre_tour.js");
const req_entrer = require("./req_entrer.js");
const req_contacter = require("./req_contacter.js");
const req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
const req_afficher_signaler = require("./req_afficher_signaler.js");
const req_afficher_mdp = require("./req_afficher_mdp.js");
const req_mdp_oublier = require("./req_mdp_oublier.js");
const req_question_secrete = require("./req_question_secrete.js");
const req_afficher_accueil_jeu = require("./req_afficher_accueil_jeu.js");
const req_effacer_fichiers = require("./req_effacer_fichiers.js");


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR
		try {
			switch (pathname) {
				case '/':
				case '/req_entrer':
					req_entrer(req, res, query);
					break;
				case '/req_afficher_formulaire_inscription':
					req_afficher_formulaire_inscription(req, res, query);
					break;
				case '/req_inscrire':
					req_inscrire(req, res, query);
					break;
				case '/req_entrer':
					req_entrer(req, res, query);
					break;
				case '/req_afficher_signaler':
					req_afficher_signaler(req, res, query);
					break;
				case '/req_afficher_mdp':
					req_afficher_mdp(req, res, query);
					break;
				case '/req_question_secrete':
					req_question_secrete(req, res, query);
					break;
				case '/req_connecter':
					req_connecter(req, res, query);
					break;
				case '/req_afficher_accueil_jeu':
					req_afficher_accueil_jeu(req, res, query);
					break;
				case '/req_mdp_oublier':
					req_mdp_oublier(req, res, query);
					break;
				case "/req_commencer":
					req_commencer(req, res, query);
					break;
				case "/req_retour_accueuil":
					req_retour_acceuil(req, res, query);
					break;
				case "/req_attendre_joueur":
					req_attendre_joueur(req, res, query);
					break;
				case "/req_demarrer":
					req_demarrer(req, res, query);
					break;
				case "/req_lancer_des":
					req_lancer_des(req, res, query);
					break;
				case "/req_attendre_tour":
					req_attendre_tour(req, res, query);
					break;
				case "/req_contacter":	
					req_contacter(req, res, query);
					break;
				case "/req_effacer_fichiers":
					req_effacer_fichiers(req, req, query)
					break;
				default:
					req_statique(req, res, query);
					break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
