const Roles = (sequelize, DataTypes) => {
    const Role = sequelize.define("token", {
        token: {
            type: DataTypes.STRING,
            required: true
        }
    });
    // Role.prototype.generateAuthToken = async function (user) {
    //     try {
    //         // console.log("hi its me");
    //         let tokens = jwt.sign({ user_Id: user.id }, process.env.SECRET_KEY);
    //         console.log(tokens);
    //         // const user_token = new Role({ user_Id: user.user_id, token: tokens });
    //         // await user_token.save();
    //         return tokens;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return Role;
};
module.exports = Roles;