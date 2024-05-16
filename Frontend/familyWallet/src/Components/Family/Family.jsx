import React, { useState } from 'react';
import layouts from "../../styles/layouts.module.css";
import { useFamilyContext } from '../../context/familyContext';

function Family() {
  const { createFamily, joinFamily } = useFamilyContext();
  const [familyName, setFamilyName] = useState('');

  const handleCreateFamily = () => {
    if (familyName.trim() !== '') {
      createFamily({ name: familyName });
    } else {
      // Obsługa błędu, gdy nazwa rodziny jest pusta
    }
  };

  const handleJoinFamily = () => {
    if (familyName.trim() !== '') {
      joinFamily(familyName);
    } else {
      // Obsługa błędu, gdy nazwa rodziny jest pusta
    }
  };

  return (
    <div className={layouts.familyPage}>
      <h1>Family Page</h1>
      <div className={layouts.familyForm}>
        <h2>Create Family</h2>
        <input
          type="text"
          placeholder="Enter family name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <button onClick={handleCreateFamily}>Create</button>
      </div>
      <div className={layouts.familyForm}>
        <h2>Join Family</h2>
        <input
          type="text"
          placeholder="Enter family name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <button onClick={handleJoinFamily}>Join</button>
      </div>
    </div>
  );
}

export default Family;
