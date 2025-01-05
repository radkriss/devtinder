

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
        res.status(400).send(err)
    }
})

router.post("/request/review/:status/:requestId",UserAuthentication, async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;
        const requestId = req.params.requestId;
        const status = req.params.status;

        const existingConnectionRequest = await ConnectionRequest.findOne(
            {
                _id: requestId, 
                toUserId:loggedInUserId,
                status: "interested"
            }
        )

        console.log(existingConnectionRequest);

        if (!existingConnectionRequest) {
            throw Error("No connection requested between the users")
        }

        existingConnectionRequest.status = status;

        const data = await existingConnectionRequest.save();


        res.send("Connection review done !!")
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
})

module.exports = router;