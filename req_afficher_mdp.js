"use strict";

const fs = require('fs');
require('remedial');

const trait = function (req, res, query) {
    let page;
    let marqueurs;

    page = fs.readFileSync('modele_mdp_oublier.html','utf-8');

    marqueurs = {};
    marqueurs.pseudo = "";
    marqueurs.password = "";
    marqueurs.password2 = "";
    marqueurs.confirmation = "";
    marqueurs.erreur = "";
    page = page.supplant(marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();

};

module.exports = trait;

