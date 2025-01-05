const express = require("express");
const UserAuthentication = require("../middleware/auth");
const connectionRequest = require("../models/connectRequest");
const user = require("../models/user");
const router = express.Router();

router.get("/user/requests/pending", UserAuthentication, async (req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const data = await connectionRequest.find({
            toUserId:loggedInUserId,
            status: "interested"
        }).populate("fromId", "firstName lastName")

        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

router.get("/user/connections", UserAuthentication, async(req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const data = await connectionRequest.find({
            $or : [
                {toUserId: loggedInUserId, status: "accepted"},
                {fromId: loggedInUserId, status: "accepted"}
            ]
        });

        res.send(data);


    } catch(err) {
        res.status(400).send(err)
    }
})

router.get("/user/feed", UserAuthentication, async (req, res) => {
    const loggedInUserId = req.user._id;

    try {
        const data = await connectionRequest.find({
            $or: [
                {fromId: loggedInUserId},
                {toUserId: loggedInUserId}
            ]
        })
        .select("fromId toUserId");

        const hideUsers = new Set();

        data.forEach(request => {
            hideUsers.add(request.fromId.toString());
            hideUsers.add(request.toUserId.toString());
        })

        const users = await user.find({
            _id: { $nin: Array.from(hideUsers)}
        })

        res.send(users);

        


    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;