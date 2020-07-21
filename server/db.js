var mongoose = require("mongoose");
const pplSchema = require("./model");

const db = mongoose.model("user", pplSchema);

module.exports = db;
