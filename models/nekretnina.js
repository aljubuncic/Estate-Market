const Sequelize = require('sequelize');

module.exports = function(sequelize){
    const Nekretnina = sequelize.define('Nekretnina', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tip_nekretnine: {
            type: Sequelize.STRING,
            allowNull: false
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kvadratura: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        cijena: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        tip_grijanja: Sequelize.STRING,
        lokacija: {
            type: Sequelize.STRING,
            allowNull: false
        },
        godina_izgradnje: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        datum_objave: {
            type: Sequelize.DATE,
            allowNull: false
        },
        opis: Sequelize.STRING
    },
    {
        freezeTableName: true
    }
    );
    return Nekretnina;
}