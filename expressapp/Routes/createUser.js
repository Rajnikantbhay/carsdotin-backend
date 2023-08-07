const router = require("express").Router();
const SignupSchema = require("../models/User");
const { body ,validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.post("/api/user",[
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required"),
    body('email').isEmail().withMessage("Not a valid email"),
    body('password').notEmpty().withMessage("Password is required"),
    body('password').isLength({ min:8 }).withMessage("password must be at least 8 characters long")
] ,async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const salt = 10;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await SignupSchema.create({name, email, password: hashedPassword});
        await newUser.save();

        res.json({success: true});

    } catch (error) {
        console.log(error)
    }
    
})

module.exports = router;