const Sequelize = require('sequelize');

module.exports = function(sequelize){
    const Upit = sequelize.define('Upit', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        korisnik_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tekst_upita: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
    );
    return Upit;
}