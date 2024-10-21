
const mongoose = require("mongoose");

const ConnectionRequestSchema = new mongoose.Schema({
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: "string",
        required: true,
        enum: {
            values: ["interested","ignored","accepted","rejected"],
            message: `{VALUE} is incorrect type`
        }
    }
},{
    timestamps: true
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;