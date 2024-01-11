const db = require('./db.js');
async function pripremaBaze(){
    await db.sequelize.sync();
    await inicijalizacija();
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");

    async function inicijalizacija(){

    }
}

module.exports = pripremaBaze;