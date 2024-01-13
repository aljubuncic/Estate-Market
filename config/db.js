const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('wt24','root','password', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.korisnik = require(path.join(__dirname,'../models/korisnik.js'))(sequelize); 
db.nekretnina = require(path.join(__dirname,'../models/nekretnina.js'))(sequelize); 
db.upit = require(path.join(__dirname,'../models/upit.js'))(sequelize); 

//1 na n veze
db.korisnik.hasMany(db.upit, {foreignKey: 'korisnik_id'});
db.upit.belongsTo(db.korisnik, {foreignKey: 'korisnik_id', as: 'korisnik'});

db.nekretnina.hasMany(db.upit, {as: 'upiti'});
db.upit.belongsTo(db.nekretnina);

module.exports = db;