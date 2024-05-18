import React, { useState } from "react";
import { useFamilyContext } from "../../context/familyContext";
import { useUserContext } from "../../context/userContext";

const FamilyRegistrationForm = () => {
  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState([]);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const { createFamily, registerFamilyMember, getFamily } = useFamilyContext();
  const { getUser } = useUserContext();

  const handleMemberChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
  };

  const handleRoleChange = (index, event) => {
    const { value } = event.target;
    const updatedMembers = [...members];
    updatedMembers[index].familyRole = value;
    setMembers(updatedMembers);
  };

  const addMember = () => {
    setMembers([
      ...members,
      { name: "", email: "", password: "", familyRole: "parent" },
    ]);
    setShowMemberForm(true);
  };

  const removeFormMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const family = await createFamily(familyName);
      const familyId = family._id;

      await Promise.all(
        members.map((member) => registerFamilyMember(familyId, member))
      );
      getUser();
      getFamily();
    } catch (error) {
      console.error(
        "There was an error creating the family or registering members!",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Family</h2>
      <label>
        Family Name:
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          required
        />
      </label>
      <br />
      {showMemberForm &&
        members.map((member, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={member.email}
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={member.password}
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </label>
            <label>
              Family Role:
              <select
                name="familyRole"
                value={member.familyRole}
                onChange={(event) => handleRoleChange(index, event)}
                required
              >
                <option value="parent">Parent</option>
                <option value="child">Child</option>
              </select>
            </label>
            <button type="button" onClick={() => removeFormMember(index)}>
              Remove
            </button>
          </div>
        ))}

      <button type="button" onClick={addMember}>
        Add Member
      </button>
      <button type="submit">Create Family</button>
    </form>
  );
};

export default FamilyRegistrationForm;
