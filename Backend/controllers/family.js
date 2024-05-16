const Family = require("../models/FamilyModel");
const User = require("../models/auth/UserModel");

exports.createFamily = async (req, res) => {
  const { name } = req.body;

  try {
    // Sprawdzanie, czy rodzina o podanej nazwie już istnieje
    const existingFamily = await Family.findOne({ name });
    if (existingFamily) {
      return res.status(400).json({ message: "Family with this name already exists!" });
    }

    const newFamily = new Family({ name });

    await newFamily.save();
    res.status(200).json({ message: "Family created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

exports.joinFamily = async (req, res) => {
    const { familyName } = req.params;
    const userId = req.user._id;
  
    try {
      // Sprawdzenie, czy użytkownik już należy do jakiejś rodziny
      const user = await User.findById(userId);
      if (user.family) {
        return res.status(400).json({ message: "User already belongs to a family!" });
      }
  
      // Sprawdzenie, czy podana rodzina istnieje
      const family = await Family.findOne({ name: familyName });
      if (!family) {
        return res.status(404).json({ message: "Family not found!" });
      }
  
      // Przypisanie użytkownika do rodziny
      user.family = family._id;
      await user.save();
  
      res.status(200).json({ message: "User joined the family successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error!" });
    }
  };
