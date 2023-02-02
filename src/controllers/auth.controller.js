const jwt = require("jsonwebtoken");
const user_service = require("../services/user.service");
const config = require("../../config/auth.config");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        await user_service.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "USER"
        });
        res.send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await user_service.findAuthUserByEmail(req.body.email);

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        req.session.token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).send({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            roles: user.role,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};
