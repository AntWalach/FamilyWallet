const Family = require("../models/FamilyModel.js");
const User = require("../models/auth/UserModel.js");
const generateToken = require("../helpers/generateToken.js");

exports.createFamily = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user._id;
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found!" });
    }

    const family = new Family({ name, owner: ownerId, members: [ownerId] });
    await family.save();

    owner.family = family._id;
    await owner.save();

    res.status(201).json({ message: "Family created", data: family });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.registerFamilyMember = async (req, res) => {
  const { familyId, name, email, password, familyRole } = req.body;

  const family = await Family.findById(familyId);
  if (!family) {
    return res.status(404).json({ message: "Family not found" });
  }
  //validation
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  //check password
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    family: familyId,
    name,
    email,
    password,
    familyRole,
  });

  const token = generateToken(user._id);

  await user.save();
  family.members.push(user._id);
  await family.save();

  if (user) {
    const { _id, name, email, role, photo, bio, isVerified } = user;

    // 201 Created
    res.status(201).json({
      _id,
      name,
      email,
      role,
      photo,
      bio,
      isVerified,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

exports.getFamily = async (req, res) => {
  try {
    const familyId = req.user.family;
    const family = await Family.findById(familyId).populate(
      "members",
      "name email role photo bio isVerified"
    );
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};

exports.deleteFamily = async (req, res) => {
  try {
    const { id } = req.params;

    const family = await Family.findById(id);
    if (!family) {
      return res.status(404).json({ message: "Family not found" });
    }

    const ownerId = req.user._id;
    if (!family.owner.equals(ownerId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this family" });
    }

    await User.deleteMany({ _id: { $in: family.members, $ne: ownerId } });

    await Family.findByIdAndDelete(id);

    const owner = await User.findById(ownerId);
    owner.family = null;
    await owner.save();
    res.status(200).json({ message: "Family deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
