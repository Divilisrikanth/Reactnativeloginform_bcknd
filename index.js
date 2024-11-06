const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const List_of_users = require("./db/Task");
//const bcrypt = require("bcrypt");
require("dotenv").config();
app.use(cors());

const port = 5000;

app.get("/Home", (req, res, next) => {
  res.send("This is home page");
});
app.use(express.json());

//const dbusername = "abc@gmail.com";
//const dbPassword = "password";

app.post("/profile", async (req, res, next) => {
  const { emailid, password } = req.body;
  try {
    const user = await List_of_users.findOne({
      dbusername: emailid,
      dbpassword: password,
    });

    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json("username or password is incorrect");
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/Update", async (req, res, next) => {
  const { emailid, password,password1 } = req.body;
  try {
    const user = await List_of_users.findOne({ dbusername: emailid ,dbpassword:password});
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User before update:", user);
   // const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await List_of_users.findOneAndUpdate(
      { dbusername: emailid },
      { dbpassword: password1 },
      { new: true }
    );
    console.log("updated user:", user);
    if (user) {
      res.status(200).json({ message: "Password updated sucessfully", user });
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (err) {
    console.error("Error during password update:", err);
    res.status(500).json({ message: "internal server error" });
  }
});
//switch local address of your machine to run this app on mobile android expo app metro waiting on exp://
//app.listen(port, "192.168.1.2", async () => {
  app.listen(port , async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`server is listening at ${port}`);
  } catch (err) {
    console.log(err);
  }
});
const createUser = async (dbusername, dbpassword) => {
  const List = new List_of_users({ dbusername, dbpassword });
  try {
    await List.save();
    console.log("User created:", List);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Run the application
//const run = async () => {
//  await connectDB();
//  await createUser("john@gmail.com", "password123$789"); // Example user
//  mongoose.connection.close(); // Close the connection when done
//};
