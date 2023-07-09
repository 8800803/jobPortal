const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Sequelize, DataTypes, where } = require('sequelize');
var db = require('../models');
const UserAuthentication = require('../middleware/UserAuthentication');
const Contact = db.contact;
const Company = db.company;
const Employee = db.employee;
const Users = db.users;
const tokens = db.tokens;
const sendEmail = require('../util/sendEmail');
const router = express.Router();
router.use(cookieParser());
router.get('/', (req, res) => {
    res.send(`hello it is too on auth`);
});
router.post('/register', async (req, res) => {
    const { name, email, phone, password, confirmed } = req.body;
    if (!name || !email || !phone || !password || !confirmed) {
        return res.status(422).json({ error: `please enter all field properly` });
    }
    try {
        const userExist = await Users.findOne({
            where: { email: email }
        });

        // .then((userExist) => {
        if (userExist) {
            // userExist.testMethod();
            return res.status(422).json({ error: `You have already account` });
        }
        // });

        if (password === confirmed) {
            const user = new Users({ name, email, phone, password });

            await user.save();

            // .then(() => {
            res.status(201).json({ message: 'user registration is sucessfully done' });
            // }).catch((err) => { res.status(200).json({ error: err }) });
        }
        else {
            res.status(422).json({ message: 'password and confirmed password is not matching' });
        }

    }
    catch (err) {
        res.status(422).json({ error: err });
    }
    // console.log(req.body);
    // res.send(`mera register`);
    // res.json({ message: req.body });

});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: `please enter all field properly` });
    }
    try {
        const user = await Users.findOne({
            // include: {
            //     model: tokens,
            //     attributes: ['user_id', "token"]
            // },
            where: {
                email: email
            }
        });
        if (user) {
            const isMatch = await bcryptjs.compare(password, user.password);
            const generateAuthToken = async () => {
                try {
                    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
                    // console.log(token);
                    let user_token = new tokens({ user_id: user.id, token: token });
                    user_token.save();
                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 2589200),
                        httpOnly: true
                    });
                    return token;
                }
                catch (err) {
                    console.log(err);
                }
            };

            // user.text();
            if (isMatch) {
                const toke = generateAuthToken();
                console.log(toke);
                return res.json({ message: 'You have now login' });
            }
            else {
                return res.status(422).json({ error: 'Invalid Credentials ' });
            }
        }
        else {
            res.status(422).json({ error: 'Invalid credentials' });
        }


    }
    catch (err) {
        console.log(err);
    }
})
router.get('/getcontact', UserAuthentication, (req, res) => {
    res.send(req.rootUser);
});
router.post('/contact', UserAuthentication, async (req, res) => {
    const { name, subject, message } = req.body;
    if (!name || !subject || !message) {
        res.status(422).json({ error: "please fill all fields" });
    }
    try {
        const cont = new Contact({ name, email: req.rootUserEmail, subject, message, user_id: req.rootUserId });
        await cont.save();
        res.status(201).json({ message: 'Contact message is sucessfully send' });
    }
    catch (err) {
        res.status(420).json({ err });
    }
})
router.post('/postnewjob', UserAuthentication, async (req, res) => {
    const { jobTitle, Salary, CompanyName, JobType, Location, jobDescription } = req.body;
    if (!jobTitle || !Salary || !CompanyName || !JobType || !Location || !jobDescription) {
        res.status(422).json({ error: "please fill all fields" });
    }
    try {
        const cont = new Company({ jobTitle, Salary, CompanyName, JobType, Location, jobDescription, user_id: req.rootUserId });
        await cont.save();
        res.status(201).json({ message: 'Post is sucessfully send' });
    }
    catch (err) {
        res.status(420).json({ err });
    }
})
router.post('/userdatail', UserAuthentication, async (req, res) => {
    const { firstName,
        lastName,
        dob,
        gender,
        experience,
        careerlevel,
        salary,
        city,
        phone,
        degreetitle,
        field,
        institute,
        instituteCity,
        completionYear,
        gpa,
        jobTitle,
        Company,
        industry,
        manage,
        jobcity,
        Expsalary,
        startDate,
        EndDate, } = req.body;
    if (!firstName ||
        !lastName ||
        !dob ||
        !gender ||
        !experience ||
        !careerlevel ||
        !salary ||
        !city ||
        !phone ||
        !degreetitle ||
        !field ||
        !institute ||
        !instituteCity ||
        !completionYear ||
        !gpa ||
        !jobTitle ||
        !Company ||
        !industry ||
        !manage ||
        !jobcity ||
        !Expsalary ||
        !startDate ||
        !EndDate) {
        res.status(424).json({ error: "please fill all fields" });
    }
    const user = await Employee.findOne({
        // include: {
        //     model: tokens,
        //     attributes: ['user_id', "token"]
        // },
        where: {
            user_id: req.rootUserId
        }
    });
    if (user) {
        res.status(423).json({ error: "your detail is already exist" });
    }
    try {
        const cont = new Employee({
            firstName,
            lastName,
            dob,
            gender,
            email: req.rootUserEmail,
            experience,
            careerlevel,
            salary,
            city,
            phone,
            degreetitle,
            field,
            institute,
            instituteCity,
            completionYear,
            gpa,
            jobTitle,
            Company,
            industry,
            manage,
            jobcity,
            Expsalary,
            startDate,
            EndDate, user_id: req.rootUserId
        });
        await cont.save();
        res.status(201).json({ message: 'User detail is sucessfully entered' });
    }
    catch (err) {
        res.status(420).json({ err });
    }
})
router.get('/getuserdata', UserAuthentication, async (req, res) => {
    try {
        const detail = await Employee.findAll({
            where: {
                user_id: req.rootUserId
            }
        });
        res.status(200).json(detail);
    }
    catch (err) {
        res.status(422).json(err);
    }
})
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout');
})
module.exports = router;