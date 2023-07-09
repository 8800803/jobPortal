const jwt = require('jsonwebtoken');
// const dotnev = require("dotenv").config();
var db = require('../models');
const User = db.users;
const useroken = db.tokens;
const UserAuthentication = async (req, res, next) => {
    try {
        // console.log(req.signedCookies);
        const token = await req.cookies.jwtoken;
        console.log('token is :' + token);
        const veriftoken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(veriftoken.id);
        const tk = await useroken.findOne({
            where: {
                user_id: veriftoken.id,
                token: token
            }
        });
        // console.log(tk);
        if (!tk) {
            res.status(200).send('no token');
        }
        const rootUser = await User.findOne({
            where: {
                id: tk.user_id
            }
        });
        if (!rootUser) {
            throw new Error('user not found');
        }
        req.token = token;
        req.rootUser = rootUser;
        // console.log(rootUser);
        req.rootUserId = rootUser.id;
        req.rootUserEmail = rootUser.email;
        req.rootUserName = rootUser.name;
        // console.log(rootUser.email);
        next();

    } catch (error) {
        res.status(401).send('unauthenticate! no token found');
        console.log(error);

    }

}
module.exports = UserAuthentication;