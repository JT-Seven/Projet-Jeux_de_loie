// Provoque le début d'une partie avec toutes les personnes présentes dans le lobby.

"use strict";

const fs = require("fs");
require("remedial");

const trait = function (req, res, query) {
    let page;

    fs.writeFileSync("lobby.json", "", "utf-8");
    fs.writeFileSync("partie.json", "", "utf-8");

    page = fs.readFileSync("./modele_accueil_jeu.html", "utf-8");


    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(page);
    res.end();
};

module.exports = trait;