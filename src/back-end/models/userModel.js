import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//Tạo Schema cho user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
//compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//hash password before saving
userSchema.pre("save", async function (next) {
  //check if password is modified
  if (!this.isModified("password")) {
    next(); //if not modified, move on
  }
  //if modified, hash password
  else {
    const salt = await bcrypt.genSalt(10); //generate salt, salt is a random string
    this.password = await bcrypt.hash(this.password, salt); //hash password
  }
});
const User = mongoose.model("User", userSchema);
export default User;
