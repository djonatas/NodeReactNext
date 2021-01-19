const {check} = require('express-validator');

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name é obrigatório'),

    check('email')
        .isEmail()
        .withMessage('Email inválido'),

    check('password')
        .isLength({min: 6})
        .withMessage('A senha deve ter pelo menos 6 caracteres')
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Email inválido'),

    check('password')
        .isLength({min: 6})
        .withMessage('A senha deve ter pelo menos 6 caracteres')
];
