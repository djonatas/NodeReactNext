const express = require('express');
const router = express.Router();
const controllerAuth = require('../controllers/auth');
const { runValidation } = require('../validator');
const { userSignupValidator, userSigninValidator } = require('../validator/auth');

router.post('/signup', userSignupValidator, runValidation, controllerAuth.signup);
router.post('/signin', userSigninValidator, runValidation, controllerAuth.signin);
router.get('/signout', controllerAuth.signout);

router.get('/secret', controllerAuth.requireSignin, (req, res) => {
    res.json( {
        message: 'Você tem acesso a essa pagina'
    })
})

module.exports = router;
