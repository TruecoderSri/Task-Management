const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://srinewuser:l9waR1GKB1lA1Ocw@cluster0.ydwn2f5.mongodb.net/taskManager";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
});

var db = mongoose.connection;
db.on("connected", () => {
  console.log("Mongo DB Connected");
});
db.on("error", () => {
  console.log("Mongo DB Connection Failed");
});
module.exports = mongoose;

// MszwdXBO03fCYu8p

// l9waR1GKB1lA1Ocw
