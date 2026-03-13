const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

async function seedAdmin(){

const existing = await User.findOne({role:"ADMIN"});

if(existing){
 console.log("Admin already exists");
 process.exit();
}

const hashed = await bcrypt.hash("admin123",10);

await User.create({
 name:"System Admin",
 email:"admin@parkflow.com",
 password:hashed,
 role:"ADMIN"
});

console.log("Admin created");

process.exit();
}

seedAdmin();