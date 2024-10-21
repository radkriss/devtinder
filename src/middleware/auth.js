const User = require("../models/user");
const jwt = require("jsonwebtoken");

const UserAuthentication = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const {token } = cookies;
        const decodedMesage = await jwt.verify(token, "NandhanMamae");
        const {_id } = decodedMesage;
        const user = await User.findById(_id);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send(err);
    }
    
}

module.exports = UserAuthentication;