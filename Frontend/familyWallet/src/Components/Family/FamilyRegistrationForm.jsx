import React, { useState } from 'react';
import axios from 'axios';
import { useFamilyContext } from '../../context/familyContext';
import { useUserContext } from '../../context/userContext';

const FamilyRegistrationForm = () => {

const [familyName, setFamilyName] = useState('');
const [members, setMembers] = useState([{ name: '', email: '', password: '' }]);
const { createFamily, registerFamilyMember } = useFamilyContext();
const {getUser} = useUserContext()
const handleMemberChange = (index, event) => {
  const { name, value } = event.target;
  const updatedMembers = [...members];
  updatedMembers[index][name] = value;
  setMembers(updatedMembers);
};

const addMember = () => {
  setMembers([...members, { name: '', email: '', password: '' }]);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const family = await createFamily(familyName);
    const familyId = family._id;

    await Promise.all(
      members.map(member => registerFamilyMember(familyId, member))
    );
    getUser()
  } catch (error) {
    console.error('There was an error creating the family or registering members!', error);
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

      <h3>Family Members</h3>
      {members.map((member, index) => (
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
        </div>
      ))}
      <button type="button" onClick={addMember}>Add Member</button>
      <button type="submit">Create Family</button>
    </form>
  );
};

export default FamilyRegistrationForm;
