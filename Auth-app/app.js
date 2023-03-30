import dotenv from "dotenv";
import db from "./config/db.js";
import express from "express";
import User from "./model/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
dotenv.config();

const app = express();

app.use(express.json());
db();

const { SECRET } = process.env;

app.post("/api/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.post("/api/register", async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(409).send("User Already Exist. Please Login");

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign({
            user_id: user._id, email
        },
            SECRET,
            { expiresIn: "2h" });

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/login", async (req, res) => {

    try {
        let { email, password } = req.body;

        if (!(email && password)) res.status(400).send("All input is required");

        email = email.toLowerCase();
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                SECRET,
                { expiresIn: "2h", });

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


export default app;