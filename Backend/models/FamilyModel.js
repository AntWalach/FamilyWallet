const mongoose = require("mongoose");

const FamilySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true });

module.exports = mongoose.model("Family", FamilySchema);