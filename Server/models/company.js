const { Sequelize } = require('sequelize');
const Company = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post_New_job', {
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Salary: {
            type: DataTypes.NUMERIC,
            allowNull: false,
        },
        CompanyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        JobType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
    )
    // Users.prototype.text = function () {
    //     console.log("hello");
    // }

    return Post;
}

module.exports = Company;
