const mongoose = require("mongoose");
const Project = require("./project");
const cdnUrl = "https://cdn.adminapp.com";

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: ["active"],
      enum: ["active", "trialing", "overdue", "canceled"]
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
});

orgSchema.post("remove", async function(doc, next) {
  await Project.deleteMany({ org: doc._id });
  next();
});

module.exports = mongoose.model("org", orgSchema);
