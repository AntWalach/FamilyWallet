import React, { useState } from "react";
import layouts from "../../styles/layouts.module.css";
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
      { name: "", email: "", password: "", familyRole: "" },
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
    <form className={`${layouts.form}`} onSubmit={handleSubmit}>
      <h1>Create Family</h1>
      <div className={`${layouts.inputControl}`} style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={familyName}
          name={'title'}
          placeholder='Enter family name'
          onChange={(e) => setFamilyName(e.target.value)}
          required
        />
      </div>
      {showMemberForm &&
        members.map((member, index) => (
          <div key={index} style={{ marginBottom: '-1rem' }}>
            <div className={`${layouts.inputControl}`} style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                name="name"
                value={member.name}
                placeholder="Enter family member name"
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </div>
            <div className={`${layouts.inputControl}`} style={{ marginBottom: '1rem' }}>
              <input
                type="email"
                name="email"
                value={member.email}
                placeholder="Enter family member email"
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </div>
            <div className={`${layouts.inputControl}`} style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                name="password"
                value={member.password}
                placeholder="Password"
                onChange={(event) => handleMemberChange(index, event)}
                required
              />
            </div>
            <div className={`${layouts.selects} ${layouts.inputControl}`} style={{ marginBottom: '1rem' }}>
              <select
                name="familyRole"
                value={member.familyRole}
                onChange={(event) => handleRoleChange(index, event)}
                required
              >
                <option value="" disabled>Family role</option>
                <option value="parent">Parent</option>
                <option value="child">Child</option>
              </select>
            </div>
            <div className={`${layouts.submitBtn}`}>
              <button type="button" className={`${layouts.buttonSubmit}`} onClick={() => removeFormMember(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}

      <div className={`${layouts.submitBtn}`}>
        <button type="button" className={`${layouts.buttonSubmit}`} onClick={addMember}>
          Add Member
          <i className="fa-solid fa-user-plus mx-2"></i>
        </button>
      </div>
      <div className={`${layouts.submitBtn}`}>
        <button type="submit" className={`${layouts.buttonCreateFamily}`}>
          Create Family
          <i className="fa-solid fa-house mx-2"></i>
        </button>
      </div>
    </form>
  );
};

export default FamilyRegistrationForm;
