const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Este email está em uso !'
            });
        }

        const {name, email, password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({name, email, password, profile, username});

        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            /*res.json({
                user : success
            })*/

            res.json({
                message : 'Registro realizado com sucesso'
            })
        });
    });
};


exports.signin = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email: req.body.email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Email não localizado!'
            });
        }

        if (!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email e senha não encontrado !'
            });
        }

        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {expiresIn: 'id'});

        const {_id, username, name, email, role} = user;

        return res.json({
            token, user
        })
    });
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json( {
        message: 'logoff realizada com sucesso'
    });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256']
});

