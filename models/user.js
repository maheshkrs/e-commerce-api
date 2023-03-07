const mongoose = require("mongoose");

// exports.User = mongoose.model("User", {
//   name: { type: String, required: true },
//   emp_id: { type: Number, unique: true },
//   designation: { type: String },
//   password: { type: String },
// });

exports.users = mongoose.model("users", {
    // userid: { type: Number},
    userpassword : {type:String},
    username: { type: String },
    userrole: { type: String}
});


