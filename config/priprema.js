const db = require('./db.js');
const fs = require('fs');
const path = require('path');

async function pripremaBaze(){
    await db.sequelize.sync();
    await inicijalizacijaPodataka();
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");

    async function inicijalizacijaPodataka(){
        if(db.korisnik.findAll().length !=0)
            return;
        let data = await fs.promises.readFile(path.join(__dirname,'../data/korisnici.json'),);
        let korisnici = JSON.parse(data);

        for(let korisnik of korisnici)
            await db.korisnik.create(korisnik);

        if(db.nekretnina.findAll().length !=0)
            return;

        data = await fs.promises.readFile(path.join(__dirname,'../data/nekretnine.json'),);
        let nekretnine = JSON.parse(data);

        for(let nekretnina of nekretnine){
            const {upiti, ...nekretninaBezUpita} = nekretnina;
            nekretninaBezUpita.klikovi = 0;
            nekretninaBezUpita.pretrage = 0;
            await db.nekretnina.create(nekretninaBezUpita);
        }
    }
}

module.exports = pripremaBaze;