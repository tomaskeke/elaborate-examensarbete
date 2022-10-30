const mongoose = require("mongoose");


const todoSchema = mongoose.Schema(
{
    private: {
        type: String || Boolean
    },
    event: {
        type: String || Boolean
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    userDetails: {},
    todoDetails: []

}
);

module.exports = mongoose.model("Todo", todoSchema);
