const { DataTypes } = require('sequelize');

module.exports= (sequelize) => {    
    sequelize.define('UserAdmin', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },                    
        password :{
            type:DataTypes.STRING       
        },
    },{
        timestamps: true
    });
};