var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
var authRoutes = require("./authRoutes");
var comment = require("./comment");
var likes = require("./likes");
var feed = require("./feed");
var category = require("./category");
var mongoose = require("mongoose");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/pplUser", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/comment", comment);
app.use("/likes", likes);
app.use("/feed", feed);
app.use("/category", category);

app.listen(8080, () => {
	console.log("server is running at 8080");
});
