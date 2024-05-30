const express = require("express");
const router = express.Router();
require("../db/funddbcon");
const bodyParser = require("body-parser");
router.use(bodyParser.json()); //req.body

const users = require("../model/userSchema");

router.post("/user1", async (req, res) => {
	const postResult = {
		name: "akram",
		status: "receiver",
		email: "akram@gmail.com",
		password: "akram123",
		account: "akram123",
		address: "lahore,,,,,,,,,router router",
	};
	console.log("result at console from user1 router router router....", postResult);
	res.send(postResult);
});

router.post("/user2", async (req, res) => {
	const userName = "ali";
	try {
		const result = await users.findOne({ name: userName });
		console.log("result of response result 2.........", result);
		res.status(200).json(result);
	} catch {
		res.status(500).json({ message: " some thing went wronge..." });
	}
});

router.post("/senduserdata", async (req, res) => {
	try {
		const data = req.body;
		// const { name, status, email, password, account, address } = req.body;
		const newUser = new users(data);

		const regUser = await newUser.save();
		console.log("new your saved...", regUser);
		res.status(200).json(regUser);
	} catch (error) {
		console.log("internal server error", error);
		res.status(500).send({ error });
	}

	// console.log(`{users}`, "user register succesfully....");
	// console.log("new user", regUser);
});

module.exports = router;
