const { ARRAY, Sequelize } = require('sequelize');
const Contact = (sequelize, DataTypes) => {
    const Contacts = sequelize.define('contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true

            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },



    }
    )

    // Users.prototype.text = function () {
    //     console.log("hello");
    // }

    return Contacts;
}

module.exports = Contact;
