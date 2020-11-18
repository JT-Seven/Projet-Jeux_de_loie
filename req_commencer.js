"use strict"

const fs = require("fs");

const traits = function(req, res, query) {
let page;


	
		page = fs.readFileSync("modele_salle_attente.html","utf-8");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(page);
		res.end();

};

module.exports = traits;
