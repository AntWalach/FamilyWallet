const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },

    email: {
      type: String,
      required: [true, "Please an email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add password!"],
    },

    photo: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "I am a new user.",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    family: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      default: null,
    },
    familyRole: {
      type: String,
      enum: ["child", "parent"],
    },
  },
  { timestamps: true, minimize: true }
);

//hash password before save
UserSchema.pre("save", async function (next) {
  //check if the pass iss not modified
  if (!this.isModified("password")) {
    return next();
  }

  // hash the pass =>> brcypt
  //generate salt
  const salt = await bcrypt.genSalt(10);
  // hashs the pass with salt
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  next();
});

module.exports = mongoose.model("User", UserSchema);
