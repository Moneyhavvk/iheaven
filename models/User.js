const mongoose = require("mongoose")
const Schema1 = mongoose.Schema;

const user1schema = new Schema1({
    appleid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", user1schema)
