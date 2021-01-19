const {validationResult} = require('express-validator');


exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){

        let _errors = [];

        errors.array().forEach((i) => {
            _errors.push(i.msg);
        });

        return res.status(222).json({
            error: _errors
        });
    }

    next();
}
