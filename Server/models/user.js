const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ARRAY, Sequelize } = require('sequelize');
const User = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true

            }
        },
        phone: {
            type: DataTypes.NUMERIC,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }


    }
    )
    Users.addHook('beforeSave', (user, option) => {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);

    });
    // Users.prototype.text = function () {
    //     console.log("hello");
    // }

    return Users;
}

module.exports = User;
