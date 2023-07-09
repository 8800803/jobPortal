const { ARRAY, Sequelize } = require('sequelize');
const Employee = (sequelize, DataTypes) => {
    const Employees = sequelize.define('employee_detail', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false
        },
        careerlevel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degreetitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        field: {
            type: DataTypes.STRING,
            allowNull: false
        },
        institute: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instituteCity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completionYear: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gpa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        manage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jobcity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Expsalary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EndDate: {
            type: DataTypes.STRING,
            allowNull: false
        },



    }
    )

    // Users.prototype.text = function () {
    //     console.log("hello");
    // }

    return Employees;
}

module.exports = Employee;
