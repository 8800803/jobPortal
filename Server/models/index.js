const { Sequelize, DataTypes, where } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.OWNER, process.env.PASSWORD, {
    host: "localhost",
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 10,
        mon: 0,
        idle: 10000
    }
}
);
sequelize.authenticate()
    .then(() => {
        console.log("your connection is stable and established");
    })
    .catch((err) => {
        console.error(`your error is ${err}`);
    })
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("yor are sync");
    })
    .catch((err) => {
        console.error("Error is " + err);
    });
db.users = require('./user')(sequelize, DataTypes);
db.tokens = require('./token')(sequelize, DataTypes);
db.company = require('./company')(sequelize, DataTypes);
db.employee = require('./employee')(sequelize, DataTypes);
// db.post = require('./post')(sequelize, DataTypes);
// db.comment = require('./comment')(sequelize, DataTypes);
db.contact = require('./contact')(sequelize, DataTypes);

db.users.hasMany(db.tokens, { foreignKey: 'user_id' });
db.tokens.belongsTo(db.users, { foreignKey: 'user_id' });
// db.users.hasMany(db.post, { foreignKey: 'user_id' });
// db.post.belongsTo(db.users, { foreignKey: 'user_id' });
// db.post.hasMany(db.comment, { foreignKey: 'postId' });
// db.comment.belongsTo(db.post, { foreignKey: 'postId' });
db.users.hasMany(db.contact, { foreignKey: 'user_id' });
db.contact.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasMany(db.company, { foreignKey: 'user_id' });
db.company.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasOne(db.employee, { foreignKey: 'user_id' });


module.exports = db;