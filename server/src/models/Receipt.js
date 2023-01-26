const mongoose = require("mongoose");
const { Schema } = mongoose;

/* User schema fields */
const receiptSchema = new Schema({
    timestamp: Date,
    type: String,  // ecommerce, service, vip
    description: String,
    amount: Number,
    receiver: String,
    giver: String,
});

module.exports = mongoose.model("Receipt", receiptSchema);
