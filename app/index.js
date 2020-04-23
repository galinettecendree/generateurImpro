'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');

let rawdata = fs.readFileSync('../ressources/JSON/objets.json');
let objets = JSON.parse(rawdata);
rawdata = fs.readFileSync('../ressources/JSON/lieux.json');
let lieux = JSON.parse(rawdata);
rawdata = fs.readFileSync('../ressources/JSON/personnages.json');
let perso = JSON.parse(rawdata);
rawdata = fs.readFileSync('../ressources/JSON/actions.json');
let actions = JSON.parse(rawdata);

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/randomElementForImpro',
        handler: (request, h) => {

            return makeRandomObject();
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);





};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

function makeRandomObject() {
    return {
        "lieu" : randomElementFromArray(lieux),
        "personnage" : randomElementFromArray(perso),
        "action" : randomElementFromArray(actions),
        "objet" : randomElementFromArray(objets)
    };
}

function randomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}