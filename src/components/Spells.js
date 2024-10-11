import React, { useState, useEffect } from "react";
import spellsData from "./data/spells.json"; // Assuming the JSON file is in the same folder
import "./css/Spells.css";

function Spells({ spells, onSpellsChange }) {
  const [selectedSpell, setSelectedSpell] = useState(null); // State for selected spell
  const [addedSpells, setAddedSpells] = useState(spells); // Initialize with the spells prop
  const [modalVisible, setModalVisible] = useState(false);  // State for modal visibility

  // Update addedSpells when the prop changes (i.e., when data is loaded)
  useEffect(() => {
    setAddedSpells(spells);
  }, [spells]);

  // Handle spell selection
  const handleSpellChange = (e) => {
    const spellName = e.target.value;
    const spell = spellsData.find((s) => s.name === spellName);
    setSelectedSpell(spell);
  };

  // Handle adding spell to the character sheet
  const handleAddSpell = () => {
    if (selectedSpell && !addedSpells.find(s => s.name === selectedSpell.name)) {
      const updatedSpells = [...addedSpells, selectedSpell];
      setAddedSpells(updatedSpells);
      onSpellsChange(updatedSpells); // Inform the parent component about the added spells
    }
  };

  // Handle removing spell from the character sheet
  const handleRemoveSpell = (spellToRemove) => {
    const updatedSpells = addedSpells.filter((spell) => spell.name !== spellToRemove.name);
    setAddedSpells(updatedSpells);
    onSpellsChange(updatedSpells); // Inform the parent component about the updated spells
  };

  // Handle showing the modal for the selected spell
  const showModal = (spell) => {
    setSelectedSpell(spell);
    setModalVisible(true);
  };

  // Handle hiding the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="spells-container">
      <h2>Spells</h2>

      {/* Searchable Dropdown */}
      <div className="spells-actions">
        <select onChange={handleSpellChange}>
          <option value="">--Select a Spell--</option>
          {spellsData.map((spell) => (
            <option key={spell.name} value={spell.name}>
              {spell.name}
            </option>
          ))}
        </select>

        {selectedSpell && (
          <button className="add-spell-btn" onClick={handleAddSpell}>Add Spell</button>
        )}
      </div>

      {/* List of Added Spells */}
      {addedSpells.length > 0 && (
        <div>
          <h3>Added Spells</h3>
          <ul className="added-spells-list">
            {addedSpells.map((spell) => (
              <li key={spell.name}>
                <div>
                  <strong>{spell.name}</strong> <br />
                  Range: {spell.range} <br />
                  Casting Time: {spell.castingTime} <br />
                  Duration: {spell.duration} <br />
                  Skill: {spell.skill} <br />
                  Cost: {spell.cost}
                </div>
                <div>
                  <button className="remove-spell-btn" onClick={() => handleRemoveSpell(spell)}>
                    Remove
                  </button>
                  <button className="view-spell-btn" onClick={() => showModal(spell)}>
                    View Description
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal for Spell Description */}
      {modalVisible && selectedSpell && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{selectedSpell.name}</h3>
            <p><strong>Range:</strong> {selectedSpell.range}</p>
            <p><strong>Casting Time:</strong> {selectedSpell.castingTime}</p>
            <p><strong>Duration:</strong> {selectedSpell.duration}</p>
            <p><strong>Skill:</strong> {selectedSpell.skill}</p>
            <p><strong>Cost:</strong> {selectedSpell.cost}</p>
            <p>{selectedSpell.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spells;
