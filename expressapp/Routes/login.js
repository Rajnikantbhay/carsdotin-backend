const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "Hellotheremynameisrajnikantandiamadevelopernicetomeetyou"

router.post("/api/loginuser", [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({min:8}).withMessage("Password must be at least 8 characters")
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        const userData = await User.findOne({ email });
        const userWithCart = await User.findOne({ email }).populate("cart");
        if (!userData) {
            return res.status(400).json({ errors: "Email not found" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging in with a correct password" });
        }

        const data = {
            user: {
                id: userData._id,
                cart: userWithCart.cart,
            }
        }

        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken, userCart: userWithCart});

    } catch (error) {
        res.json({ error: error });
    }

});

module.exports = router;