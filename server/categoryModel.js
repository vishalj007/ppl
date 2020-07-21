const mongoose = require("mongoose");

var categoryModel = mongoose.Schema({
  category: {
    type: String,
    unique: true,
    index: true,
    require: true,
  },
});

var categoryModels = mongoose.model("categoryModels", categoryModel);

module.exports = categoryModels;
