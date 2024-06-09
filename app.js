const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const DB = process.env.donordb;
// app.use(bodyParser.json()); //req.body
require("./db/funddbcon");
const users = require("./model/userSchema");

// here this page userAuth will be rendere by the router
// when the local host home path is define by the local server....
// other wise home page of local server will be render.....
app.use(require("./router/userAuth"));

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Home page app. js..");
	console.log("i am  home page app..js.");
});

const middleware = (req, res, next) => {
	console.log(" i am middle ware function..fund fund fund ...app js.");
	res.send("i am middle ware from app.js");
	next();
};

// app.get("/about", middleware, (req, res) => {
// 	res.send("About page fund...app js");
// });

// app.listen(3000, () => {
// 	console.log("Server is running at port 3000 fund fund fund....");
// });
app.listen(PORT, () => {
	console.log("Server is running at portfund fund fund", { PORT });
});
