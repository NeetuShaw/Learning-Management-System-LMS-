const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Super Admin", "Admin", "Sub Admin", "User"], default: "User" },
  progress: [
    {
      moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "TrainingModule" },
      completed: { type: Boolean, default: false },
      percentage: { type: Number, default: 0 },
    }
  ],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
