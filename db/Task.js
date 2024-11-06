const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  dbusername: {
    type: String,
    required: [true, "must provide the name"],
    trim: true,
    maxlength: [60, "name should not more than 60 characters"],
  },
  dbpassword:{
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("List_of_users", TaskSchema);