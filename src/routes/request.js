

const express = require("express");
const router = express.Router();
const ConnectionRequest = require("../models/connectRequest");
const UserAuthentication = require("../middleware/auth");

router.post("/request/send/:status/:toUserId",UserAuthentication, async (req, res, next) => {

    try {
        const fromId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromId, toUserId}, 
                {fromId:toUserId, toUserId:fromId}
            ]
        })

        console.log(existingConnectionRequest);

        if (existingConnectionRequest) {
            throw Error("Already connection requested between the users")
        }

        const connection = new ConnectionRequest({
            fromId,
            toUserId,
            status
        })

        await connection.save();
        res.send("Connection request made !!")
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
    


})

module.exports = router;