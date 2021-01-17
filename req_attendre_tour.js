// Affiche la première page du site.

"use strict";
const afficher_plateau = require("./fct_afficher_plateau.js");
const fs = require("fs");
require("remedial");

const traits = function (req, res, query) {
    let page;
    let contenu;
    let partie;
    let i;
    let marqueurs;

    // Récupération de la liste des gens déjà en attente.

    contenu = fs.readFileSync("partie.json", "utf-8");
    partie = JSON.parse(contenu);

    // Création de la page à afficher.

    if (partie.victoire === true) {
        page = fs.readFileSync("modele_perdu.html", "utf-8");

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(page);
        res.end();
        return;
    }


    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
    marqueurs.plateau = afficher_plateau(partie);
	//trouver le pseudo du joueur sur la page modele_jeu_actif.html
    if (partie.joueurs[partie.actif].pseudo === query.pseudo) {
        marqueurs.des = partie.joueurs[partie.actif].dernierNb;
		marqueurs.role = partie.joueurs[partie.actif].role;
		marqueurs.position = partie.joueurs[partie.actif].position;
		marqueurs.Position = "Position :";
		marqueurs.Role = "Role :";

        page = fs.readFileSync("modele_jeu_actif.html", "utf-8");
    } else {
		//trouver le pseudo du joueur sur la page jeu passif
		for (i = 0; i < partie.joueurs.length; i++) {
            //trouver le joueur sur la page
            if (partie.joueurs[i].pseudo === query.pseudo) {

                marqueurs.Histoire = "Histoire: "
                marqueurs.DernierLancer = "Dernier lancer: ";
                marqueurs.role = "Role: " + partie.joueurs[i].role;
                marqueurs.position = "Position: " + partie.joueurs[i].position;

                //affiche la valeur du lancer de des precedent (definit dans req_lancer_des)
                marqueurs.des = partie.joueurs[i].dernierNb;
                //affiche le script en fonction de la case et du role
                switch (partie.joueurs[i].script) {
                    case -1:
                        marqueurs.script = "Votre quete est en cours...";
                        break;
                    case 0:
                        marqueurs.script = "Snowden viens d'arriver a moscou!";
                        break;
                    case 9:
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "Snowden viens de reussir la collecte de donnée! Acceleration de la quête!";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "Lindsay viens de rejoindre Snowden à Moscou! Acceleration de la quête!";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "corbin a reussi à communiquer avec snowden! Acceleration de la quête!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "Les Russes vienne de decouvrir une faille dans le systeme de securité Americain ! Acceleration de la quête!";
                        }
                        break;
                    case 58:
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "La quete viens d'echouer! Recommencer!";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "La quete viens d'echouer! Recommencer!";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "La quete viens d'echouer! Recommencer!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "La quete viens d'echouer! Recommencer!";
                        }

                        break;
                    case 52:
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "Snowden est en difficulté sur la resolution du blackout que subit les Etats-unis! Il devra resoudre cette affaire avant de poursuivre!";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "Lindsay viens de se faire cambrioler! Elle devra resoudre cette affaire avant de poursuivre!";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "Les Etats-unis subissent une crise economique!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "La population Russe essaye de se lever contre le regime de Poutine suite au revelation de sa vie privé par les Americain!";
                        }
                        break;
                    case 42 :
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "Snowden dois faire face a son faux  procés pour trahison!";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "Lindsay n'arrete pas de s'inquieter pour la vie de son marie !";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "Les Etats-unis doivent tenir tete lors de la Guerre industrielle!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "Les Russes sont malmené par les E-U lors de la Guerre industrielle! ";
                        }
                        break;
                    case 36 :
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "Snowden attend son extraction!";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "Lindsay est en train d'accoucher!";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "Corbin doit attendre l'investiture de Joe Biden!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "Les Russes sont en train de resoudre le programme de surveillance de masse! ";
                        }
                        break;
                    case 19 :
                        if (partie.joueurs[i].role === "Snowden") {
                            marqueurs.script = "Lindsay est enceinte !";
                        } else if (partie.joueurs[i].role === "Lindsay") {
                            marqueurs.script = "Lindsay est soupçonner par les agents Russes de cacher quelque chose!";
                        } else if (partie.joueurs[i].role === "Corbin") {
                            marqueurs.script = "Snowden reste injoignable!";

                        } else if (partie.joueurs[i].role === "LesRusses") {
                            marqueurs.script = "Les Russes echouent au trucquage des elections presidentielle 2020! ";
                        }
                        break;
                    default:
                        marqueurs.script = "";
                        break;
                }
            }
        }


		page = fs.readFileSync("modele_jeu_passif.html", "utf-8");
    }   

    page = page.supplant(marqueurs);


    // Envoi de la réponse.

    res.writeHead(200, { "Content-Type": "text/html" }); 
    res.write(page);
    res.end();
};

module.exports = traits;
