const express = require("express");
const router = express.Router();
require("../db/funddbcon");
const bodyParser = require("body-parser");
router.use(bodyParser.json()); //req.body

const users = require("../model/userSchema");

router.post("/user", async (req, res) => {
	const postResult = {
		name: "akram jameel",
		status: "receiver",
		email: "akram@gmail.com",
		password: "akram123",
		account: "akram123",
		address: "lahore,,,,,,,,,router router",
	};
	console.log("result at console from user1 router router router....", postResult);
	res.send(postResult);
});

router.get("/getselecteduser", async (req, res) => {
	const userName = "ali";
	try {
		const result = await users.findOne({ name: userName });
		console.log("result of response result 2.........", result);
		res.status(200).json(result);
	} catch {
		res.status(500).json({ message: " some thing went wronge..." });
	}
});

router.post("/addnewuserpostman", async (req, res) => {
	try {
		const newuserdata = req.body;
		const newuser2 = new users(newuserdata);
		const newuser = await newuser2.save();
		console.log("new user is added...", newuser);
		res.status(200).json(newuser);
	} catch (error) {
		console.log("Internal server error");
		res.status(500).send(error);
	}
});

router.post("/addnewuserfromrouter", async (req, res) => {
	try {
		const datafromrouter = {
			name: "akram jameel from router",
			status: "receiver",
			email: "akram@gmail.com",
			password: "akram123",
			account: "akram123",
			address: "Queta",
		};
		// const datafromrouter = req.body;
		const newUser = new users(datafromrouter);

		const regUser = await newUser.save();
		console.log("new user saved...", regUser);
		res.status(200).json(regUser);
	} catch (error) {
		console.log("internal server error", error);
		res.status(500).send({ error });
	}
});

router.get("/getallusers", async (req, res) => {
	try {
		const allUsers = await users.find();

		console.log("all users data", allUsers);
		res.status(200).json(allUsers);
	} catch (error) {
		console.log("internal server error", error);
		res.status(500).json({ message: "internal server error" });
	}
});

router.put("/updateuser/:userid", async (req, res) => {
	try {
		const userid = req.params.userid;
		const updateduser = req.body;
		// const useserUpdated = await users.updateOne(userid, updateduser, {
		const useserUpdated = await users.findByIdAndUpdate(userid, updateduser, {
			new: true,
			runValidators: true,
		});
		res.status(200).json(useserUpdated);
		if (!users) {
			console.log("user not found...");
			res.status(404).send({ message: "User not foundt..." });
		}
	} catch (error) {
		console.log("internal server error", error);
		res.status(500).send({ error });
	}
});

router.delete("/deleteuser", async (req, res) => {
	const deletedName = "baqir";
	try {
		const deletedUser = await users.deleteOne({ name: deletedName });
		res.status(200).json(deletedUser);
	} catch (error) {
		console.log("internel server error", error);
		res.status(500).send({ message: error });
	}
});

router.delete("/deleteselecteduser/:delname", async (req, res) => {
	try {
		const delname = req.params.delname;
		const delselcuser = await users.deleteOne({ name: delname });
		console.log("selected user deleted...", delselcuser);
		res.status(200).json(delselcuser);
	} catch (error) {
		console.log("Internal server error", error);
		res.status(300).send({ error });
	}
});
router.get("/getusertype/:usertype", async (req, res) => {
	try {
		const usertype = req.params.usertype;
		if (usertype == "donor" || usertype == "receiver" || usertype == "evaluator") {
			const userstatus = await users.find({ status: usertype });
			console.log("parametric user type....", userstatus);
			res.status(200).json(userstatus);
		} else {
			console.log(error);
			res.status(404).send("invalid input...");
		}
	} catch (error) {
		console.log(error);
		res.status(404).send("invalid input...");
	}
});
// commit is done .....

module.exports = router;
